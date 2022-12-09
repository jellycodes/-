package com.example.board.vel01.repository;

import com.example.board.vel01.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByNickName(String nickName);
    User findByNickNameAndPwd(String nickName, String pwd);
    Boolean existsByNickName(String nickName);
}