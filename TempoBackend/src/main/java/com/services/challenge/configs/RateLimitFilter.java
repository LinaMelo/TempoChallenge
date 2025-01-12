package com.services.challenge.configs;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter implements Filter {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        String clientIp = httpRequest.getRemoteAddr();

        Bucket bucket = buckets.computeIfAbsent(clientIp, this::createBucket);

        if (bucket.tryConsume(1)) {
            try {
                filterChain.doFilter(servletRequest, servletResponse);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            servletResponse.setContentType("application/json");
            servletResponse.setCharacterEncoding("UTF-8");
            servletResponse.getWriter().write("{\"error\": \"Ha excedido el limite de solicitudes, porfavor espere.\"}");
            ((jakarta.servlet.http.HttpServletResponse) servletResponse).setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        }
    }


    private Bucket createBucket(String clientIp) {
        return Bucket.builder()
                .addLimit(limit -> limit.capacity(300).refillGreedy(300, Duration.ofMinutes(1)))
                .build();
    }
}
