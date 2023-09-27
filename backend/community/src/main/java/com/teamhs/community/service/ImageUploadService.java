package com.teamhs.community.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageUploadService {
    @Value("${image.upload.directory}")
    private String uploadDirectory; // 이미지 업로드 디렉토리 설정

    public String uploadImage(MultipartFile image) throws IOException {
        // 이미지 업로드 처리
        String fileName = UUID.randomUUID().toString() + "-" + image.getOriginalFilename();
        String filePath = Paths.get(uploadDirectory, fileName).toString();
        Files.copy(image.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

        // 이미지 URL 반환 (예: "/uploads/images/파일명.jpg")
        return "/images/upload/" + fileName;
    }
}