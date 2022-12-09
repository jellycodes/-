package com.example.board.vel01.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
    private Long postId;
	
	@Column
	@NotNull
    private String nickName;
	
	@Column
	@NotNull
    private String title;
	
	@Column
	@NotNull
    private String content;
	
	@Column
    private Long viewCount;
	
	@Column
	private String createdDate;
	
	@Column
	private String err;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToMany(mappedBy = "post")
	private List<Comment> comments = new ArrayList<Comment>();
	
	public void setUser(User user) {
		this.user = user;
		user.getPosts().add(this);
	}
   
    @Getter@Setter
	@ToString
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
    public static class Request{
    	
        private String nickName;
        
        @NotNull(message = "게시글 제목은 null 금지")
        @NotBlank(message = "게시글 제목은 공백 금지")
        private String title;
        
        @NotNull(message = "게시글 내용은 null 금지")
        @NotBlank(message = "게시글 내용은 공백 금지")
        private String content;
        
        private String comment;
        
        public Request(final Post postEntity) {
        	this.nickName = postEntity.getNickName();
        	this.title = postEntity.getTitle();
        	this.content = postEntity.getContent();
        }
    	
    	public static Post toEntity(Post.Request req) {
    		return Post.builder()
    				.nickName(req.getNickName())
    				.title(req.getTitle())
    				.content(req.getContent())
    				.build();
    	}
    }
    
    @Getter@Setter
   	@ToString
   	@Builder
   	@NoArgsConstructor
   	@AllArgsConstructor
    public static class Response{
    	
    	private Long postId;
        private String nickName;
        private String title;
        private String content;
        private String createdDate;
        private Long viewCount;
        private String err;
        
    	
    	public static Post.Response toResponse(Post postEntity){
    		
    		return Post.Response.builder()
    				.postId(postEntity.getPostId())
    				.nickName(postEntity.getNickName())
    				.title(postEntity.getTitle())
    				.content(postEntity.getContent())
    				.createdDate(postEntity.getCreatedDate())
    				.viewCount(postEntity.getViewCount())
    				.build();
    	}
    	
    	public static List<Post.Response> toResponseList(List<Post> posts){
    		List<Post.Response> postList = new ArrayList<Post.Response>();
    		for (Post post : posts) {
				postList.add(toResponse(post));
			}
    		return postList;
    	}
    }
    
    
}