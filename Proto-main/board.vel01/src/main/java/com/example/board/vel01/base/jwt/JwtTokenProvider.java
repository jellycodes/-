package com.example.board.vel01.base.jwt;


import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import com.example.board.vel01.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

//    private final JwtProperties jwtProperties;

    private final static String SECRET_KEY = "dlrjqjsdurgksmstkfkaqkqhdlazz";

    public String makeJwtToken(User user) {
//        Date now = new Date();
//
//        return Jwts.builder()
//                .setIssuer(jwtProperties.getIssuer())
//                .setIssuedAt(now)
//                .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis()))
//                .claim("user", user.getNickName())
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
		
		return Jwts.builder()
				.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
				.setSubject(user.getNickName())
				.setIssuer("atti app")
				.setIssuedAt(new Date())
				.setExpiration(expiryDate)
				.compact();
    }
    
    public String validateAndGetUserNickName(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(SECRET_KEY)
				.parseClaimsJws(token)
				.getBody();
		
		return claims.getSubject();
	}





}