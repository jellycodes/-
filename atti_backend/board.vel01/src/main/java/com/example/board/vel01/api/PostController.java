package com.example.board.vel01.api;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.vel01.domain.Post;
import com.example.board.vel01.domain.User;
import com.example.board.vel01.repository.PostRepository;
import com.example.board.vel01.repository.UserRepository;
import com.example.board.vel01.service.PostService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("post")
@RequiredArgsConstructor
@Slf4j
public class PostController {

	private final UserRepository userRepository;

	private final PostRepository postRepository;

	private final PostService postService;

	// 게시글 작성 = C
	@PostMapping("/writePost")
	public ResponseEntity<?> createPost(@AuthenticationPrincipal String nickName, @RequestBody Post.Request req) {

		if (req.getTitle().equals("")) {

			return ResponseEntity.badRequest().body("게시글 제목을 작성해주세요");

		} else if (req.getContent().equals("")) {

			return ResponseEntity.badRequest().body("게시글 내용을 작성해주세요.");

		}

		if (!userRepository.existsByNickName(nickName)) {

			return ResponseEntity.badRequest().body(Post.Response.builder().resMessage("로그인 후 진행해주세요").build());

		}

		try {
			Post postEntity = Post.Request.toEntity(req);

			User findUser = userRepository.findByNickName(nickName);

			postEntity.setUser(findUser);
			postService.createPost(postEntity, findUser.getNickName());

			Post.Response res = Post.Response.builder().resMessage("작성을 완료하였습니다.").build();

			return ResponseEntity.ok().body(res);

		} catch (Exception e) {

			Post.Response res = Post.Response.builder().resMessage("작성을 완료하지 못했습니다.").build();

			return ResponseEntity.badRequest().body(res);
		}
	}

	// 단일 게시글 조회
	@GetMapping("/selectPost/{postId}")
	public ResponseEntity<?> selectPost(@PathVariable Long postId) {

		Post findPost = postRepository.findByPostId(postId);

		Post.Response dto = Post.Response.toResponse(findPost);

		Post.Response res = Post.Response.builder().postId(dto.getPostId()).nickName(dto.getNickName())
				.title(dto.getTitle()).content(dto.getContent()).createdDate(dto.getCreatedDate()).viewCount(dto.getViewCount())
				.comments(dto.getComments()).build();

		return ResponseEntity.ok().body(res);
	}

	// 전체 게시글 목록
	@GetMapping("/postList/main")
	public ResponseEntity<?> allPosts() {

		List<Post> posts = postRepository.findAll();

		return ResponseEntity.ok().body(Post.Response.toResponseList(posts));
	}

	// 작성자명으로 게시글 조회 = R
	@GetMapping("/postList/{nickName}")
	public ResponseEntity<?> retrievePostList(@AuthenticationPrincipal @PathVariable String nickName) {

		List<Post> postEntities = postService.retrieve(nickName);

		List<Post.Response> res = Post.Response.toResponseList(postEntities);

		return ResponseEntity.ok().body(res);
	}

	// 게시글 수정 = U // 12월 9일날까지 작업해볼것. 세션 유지 후에 테스트 해봐야 함.
	@PutMapping
	public ResponseEntity<?> updatePost(@AuthenticationPrincipal String nickName,
			@Valid @RequestBody Post.Request req) {

		Post searchPost = postRepository.findByPostId(req.getPostId());

		log.warn("게시글 작성 유저 닉네임: " + searchPost.getNickName());

		log.warn("로그인된 유저 닉네임: " + nickName);

		if (searchPost.getNickName().equals(nickName)) {

			req.setNickName(nickName);

			List<Post> postEntities = postService.update(req, req.getPostId());

			List<Post.Response> res = Post.Response.toResponseList(postEntities);

			return ResponseEntity.ok().body(res);

		} else {

			return ResponseEntity.badRequest().body("게시글 작성자만 해당 요청을 할 수 있습니다.");

		}
	}

	@PutMapping("/{postId}")
	public ResponseEntity<?> increaseViewCount(@PathVariable Long postId) {

		Post findPost = postRepository.findByPostId(postId);

		int viewCount = findPost.getViewCount();

		findPost.setViewCount(++viewCount);

		postRepository.save(findPost);

		Post.Response res = Post.Response.toResponse(findPost);

		return ResponseEntity.ok().body(res);
	}

	// 게시글 삭제 = D
	@Transactional
	@DeleteMapping
	public ResponseEntity<?> deletePost(@AuthenticationPrincipal String nickName, @RequestBody Post.Request req) {

		Post searchPost = postRepository.findByPostId(req.getPostId());

		log.warn("게시글 작성 유저 닉네임: " + searchPost.getNickName());

		log.warn("로그인된 유저 닉네임: " + nickName);

		if (searchPost.getNickName().equals(nickName)) {
			try {
				List<Post> postEntities = postService.delete(req.getPostId());

				List<Post.Response> res = Post.Response.toResponseList(postEntities);

				return ResponseEntity.ok().body(res);

			} catch (Exception e) {

				String err = e.getMessage();

				Post.Response res = Post.Response.builder().resMessage(err).build();

				return ResponseEntity.badRequest().body(res);
			}
		} else {

			return ResponseEntity.badRequest().body("게시글 작성자만 해당 요청을 할 수 있습니다.");

		}
	}

}