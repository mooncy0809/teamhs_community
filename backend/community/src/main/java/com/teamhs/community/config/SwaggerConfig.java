package com.teamhs.community.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
    @Configuration
    @EnableSwagger2
    public class SwaggerConfig {

        private static final String API_NAME = "TeamHs API";
        private static final String API_VERSION = "0.0.1";
        private static final String API_DESCRIPTION = "Team hs API 명세서입니다.";

        @Bean
        public Docket api() {
            return new Docket(DocumentationType.SWAGGER_2)
                    .useDefaultResponseMessages(false)
                    .apiInfo(apiInfo())
                    .select()
                    .apis(RequestHandlerSelectors.basePackage("com.teamhs.community.controller"))
                    .paths(PathSelectors.any())
                    .build();
        }

        public ApiInfo apiInfo() {
            return new ApiInfoBuilder()
                    .title(API_NAME)
                    .description(API_DESCRIPTION)
                    .version(API_VERSION)
                    .build();
        }

    }
