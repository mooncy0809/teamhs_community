package com.teamhs.community.config;

import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry){
        registry.addResourceHandler("/**") //슬레이트로 시작하는 요청
                .addResourceLocations("classpath:/templates/", "classpath:/static/") //파일 찾을 경로
                .setCacheControl(CacheControl.maxAge(10, TimeUnit.MINUTES)); //캐시
    }
}
