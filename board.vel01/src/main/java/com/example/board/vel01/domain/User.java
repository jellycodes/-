package com.example.board.vel01.domain;

import io.jsonwebtoken.Claims;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;


@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Getter @Setter
@Builder
@Table(name = "user_info")
public class User {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    @Column
    private String nickName;
    @Column(length = 100, nullable = false)
    private String pwd;

    private String token;

    

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Request {
    	private String id;
        private String nickName;
        private String pwd;

        public static User toEntity(final Request request) {
            return User.builder()
                    .nickName(request.getNickName())
                    .id(request.getId())
                    .pwd(request.getPwd())
                    .build();
        }
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Response {
        private String id;
        private String nickName;
        private String pwd;
        private String token;


        public static User.Response toResponse(final User user) {
            return User.Response.builder()
                    .id(user.getId())
                    .nickName(user.getNickName())
                    .pwd(user.getPwd())
                    .token(user.getToken())
                    .build();
        }
        public static List<Response> toResponseList(final List<User> users) {
            List<Response> list = new ArrayList<>();
            for (User user : users) {
                list.add(toResponse(user));
            }
            return list;

        }
    }
}