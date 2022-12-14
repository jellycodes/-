package com.example.board.vel01.service;

import com.example.board.vel01.base.jwt.JwtTokenProvider;
import com.example.board.vel01.domain.User;
import com.example.board.vel01.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {

	private final UserRepository userRepository;

	private final JwtTokenProvider jwtTokenProvider;

	public User saveUser(User newUser) {

		if (newUser == null || newUser.getNickName() == null || newUser.getNickName() == "") {

			throw new RuntimeException("닉네임을 입력해주세요.");

		}
		final String checkNickName = newUser.getNickName();

		if (userRepository.existsByNickName(checkNickName)) {

			log.warn("닉네임이 이미 존재합니다.");

			throw new RuntimeException("닉네임이 이미 존재합니다.");
		}

		newUser.setJoinDate(new SimpleDateFormat("yyyy/MM/dd").format(new Date()));

		return userRepository.save(newUser);
	}

	public List<User> findAllUser() {
		return userRepository.findAll();
	}

	public User findUser(String nickName) {
		return userRepository.findByNickName(nickName);
	}

	public User loginUser(User.Request request) {
		return userRepository.findByNickName(request.getNickName());
	}

	public User getByCredentials(final String nickName, final String pwd, final PasswordEncoder encoder) {

		final User originalUser = userRepository.findByNickName(nickName);

		if (originalUser != null && encoder.matches(pwd, originalUser.getPwd())) {

			return originalUser;

		}
		return null;

	}
}