package com.web.winter.article;

import com.web.winter.comment.Comment;
import com.web.winter.comment.CommentForm;
import com.web.winter.comment.CommentService;
import com.web.winter.jwt.JwtUtil;
import com.web.winter.member.Member;
import com.web.winter.member.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/article")
public class ArticleController {
    private final ArticleService articleService;
    private final MemberService memberService;
    private final CommentService commentService;
    private final JwtUtil jwtUtil;

    // free
    // free 전체 게시물 조회
    @GetMapping("/free")
    @Operation(summary = "자유게시판 전체 게시물 조회", description = "자유게시판 전체 게시물 보기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 조회 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "400", description = "게시물 조회 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Page<Article>> freeArticles(@RequestParam(value = "page", defaultValue = "1") int page) {
        Page<Article> freeArticles = articleService.getFreeArticles(page);

        return ResponseEntity.ok(freeArticles);
    }

    // free 게시물 등록
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/free")
    @Operation(summary = "자유게시판 게시물 등록", description = "자유게시판에 게시물 등록함")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 등록 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Article.class))),
            @ApiResponse(responseCode = "400", description = "게시물 등록 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Article> createFreeArticle(@RequestBody @Valid ArticleForm articleForm
            , @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Article article = this.articleService.createFreeArticle(articleForm, loginMember);

        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    // free 개별 게시물 조회 // 댓글
    @GetMapping("/free/{id}")
    @Operation(summary = "자유게시판 개별 게시물 조회", description = "자유게시판 개별 게시물 보기 + 댓글")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 & 댓글 조회 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GetArticleForm.class))),
            @ApiResponse(responseCode = "400", description = "게시물 & 댓글 조회 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<GetArticleForm> freeArticle(@PathVariable("id") Long id) {
        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article Not found"));
        List<Comment> commentList = this.articleService.getCommentList(article);

        GetArticleForm getArticleForm = new GetArticleForm(article, commentList);

        return ResponseEntity.ok(getArticleForm);
    }

    // free 개별 게시물 댓글 등록
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/free/{id}")
    @Operation(summary = "자유게시판 게시물 댓글 등록", description = "자유게시판의 게시물에 댓글 등록하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 등록 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Comment.class))),
            @ApiResponse(responseCode = "400", description = "댓글 등록 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Comment> createFreeComment(@PathVariable("id") Long id, @RequestBody @Valid CommentForm commentForm,
                                                     @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article Not found"));

        Comment comment = this.commentService.createComment(commentForm, article, loginMember);

        return ResponseEntity.ok(comment);
    }

    // free 개별 게시물 댓글 수정
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/free/{id}/{commentId}")
    @Operation(summary = "자유게시판 게시물 댓글 수정", description = "자유게시판의 게시물에 댓글 수정하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 수정 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Comment.class))),
            @ApiResponse(responseCode = "400", description = "댓글 수정 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Comment> editFreeComment(@PathVariable("id") Long id, @PathVariable("commentId") Long commentId,
                                                   @RequestBody @Valid CommentForm commentForm, @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Comment comment = this.commentService.getComment(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment Not Found"));

        if (!comment.getAuthor().equals(loginMember)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
        }

        Comment updatedComment = this.commentService.editComment(comment, commentForm.getContent(), LocalDateTime.now());
        return ResponseEntity.ok(updatedComment);
    }

    // free 개별 게시물 댓글 삭제
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/free/{id}/{commentId}")
    @Operation(summary = "자유게시판 게시물 댓글 삭제", description = "자유게시판의 게시물에 댓글 삭제하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 삭제 성공", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "댓글 삭제 실패", content = @Content),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림", content = @Content)
    })
    public ResponseEntity<String> deleteFreeComment(@PathVariable("id") Long id, @PathVariable("commentId") Long commentId,
                                                    @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Comment comment = this.commentService.getComment(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment Not found"));

        if (!comment.getAuthor().equals(loginMember)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
        }

        this.commentService.delete(comment);
        return ResponseEntity.ok("Comment Deleted");
    }

    // free 개별 게시물 수정
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/free/{id}")
    @Operation(summary = "자유게시판 게시물 수정", description = "자유게시판의 게시물 수정하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 수정 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Article.class))),
            @ApiResponse(responseCode = "400", description = "게시물 수정 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Article> editArticle(@PathVariable("id") Long id, @RequestBody @Valid ArticleForm articleForm,
                                               @RequestHeader("Authorization") String auth) {

        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article Not found"));

        if (!article.getAuthor().equals(loginMember)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
        }

        Article updatedArticle = this.articleService.editArticle(article, articleForm.getTitle(), articleForm.getContent(), LocalDateTime.now());
        return ResponseEntity.ok(updatedArticle);
    }

    // free 개별 게시물 삭제
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/free/{id}")
    @Operation(summary = "자유게시판 게시물 삭제", description = "자유게시판 게시물 삭제하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 삭제 성공", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "게시물 삭제 실패", content = @Content),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림", content = @Content)
    })
    public ResponseEntity<String> deleteFreeArticle(@PathVariable("id") Long id, @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article Not found"));

        if (!article.getAuthor().equals(loginMember)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
        }

        this.articleService.deleteArticle(article);
        return ResponseEntity.ok("Deleted");
    }

    // gather
    // gather 전체 게시물 조회
    @GetMapping("/gather")
    @Operation(summary = "같이탈사람 게시판 전체 게시물 조회", description = "같이탈사람 게시판 전체 게시물 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 조회 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "400", description = "게시물 조회 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Page<Article>> gatherArticles(@RequestParam(value = "page", defaultValue = "1") int page) {
        Page<Article> gatherArticles = articleService.getGatherArticles(page);

        return ResponseEntity.ok(gatherArticles);
    }

    // gather 게시물 등록
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/gather")
    @Operation(summary = "같이탈사람 게시판 게시물 등록", description = "같이탈사람 게시판에 게시물 등록함")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 등록 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Article.class))),
            @ApiResponse(responseCode = "400", description = "게시물 등록 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Article> createGatherArticle(@RequestBody @Valid ArticleForm articleForm
            , @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Article article = this.articleService.createGatherArticle(articleForm, loginMember);

        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    // gather 개별 게시물 조회 // 댓글
    @GetMapping("/gather/{id}")
    @Operation(summary = "같이탈사람 게시판 개별 게시물 조회", description = "같이탈사람 게시판 개별 게시물 보기 + 댓글")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 & 댓글 조회 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GetArticleForm.class))),
            @ApiResponse(responseCode = "400", description = "게시물 & 댓글 조회 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<GetArticleForm> gatherArticle(@PathVariable("id") Long id) {
        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article Not Found"));

        List<Comment> commentList = articleService.getCommentList(article);

        GetArticleForm getArticleForm = new GetArticleForm(article, commentList);

        return ResponseEntity.ok(getArticleForm);
    }

    // gather 개별 게시물 댓글 등록
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/gather/{id}")
    @Operation(summary = "같이탈사람 게시판 게시물 댓글 등록", description = "같이탈사람 게시판의 게시물에 댓글 등록하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 등록 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Comment.class))),
            @ApiResponse(responseCode = "400", description = "댓글 등록 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Comment> gatherComment(@PathVariable("id") Long id, @RequestBody @Valid CommentForm commentForm,
                                                 @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article Not found"));

        Comment comment = this.commentService.createComment(commentForm, article, loginMember);

        return ResponseEntity.ok(comment);
    }

    // gather 개별 게시물 댓글 수정
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/gather/{id}/{commentId}")
    @Operation(summary = "같이탈사람 게시판 게시물 댓글 수정", description = "같이탈사람 게시판의 게시물에 댓글 수정하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 수정 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Comment.class))),
            @ApiResponse(responseCode = "400", description = "댓글 수정 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Comment> gatherComment(@PathVariable("id") Long id, @PathVariable("commentId") Long commentId,
                                                 @RequestBody @Valid CommentForm commentForm, @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Comment comment = this.commentService.getComment(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment Not Found"));

        if (!comment.getAuthor().equals(loginMember)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
        }

        Comment updatedComment = this.commentService.editComment(comment, commentForm.getContent(), LocalDateTime.now());
        return ResponseEntity.ok(updatedComment);
    }

    // gather 개별 게시물 댓글 삭제
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/gather/{id}/{commentId}")
    @Operation(summary = "같이탈사람 게시판 게시물 댓글 삭제", description = "같이탈사람 게시판의 게시물에 댓글 삭제하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 삭제 성공", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "댓글 삭제 실패", content = @Content),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림", content = @Content)
    })
    public ResponseEntity<String> gatherComment(@PathVariable("id") Long id, @PathVariable("commentId") Long commentId,
                                                @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Comment comment = this.commentService.getComment(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment Not found"));

        if (!comment.getAuthor().equals(loginMember)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
        }

        this.commentService.delete(comment);
        return ResponseEntity.ok("Comment Deleted");
    }

    // gather 개별 게시물 수정
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/gather/{id}")
    @Operation(summary = "같이탈사람 게시판 게시물 수정", description = "같이탈사람 게시판의 게시물 수정하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 수정 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Article.class))),
            @ApiResponse(responseCode = "400", description = "게시물 수정 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<Article> editGatherArticle(@PathVariable("id") Long id, @RequestBody @Valid ArticleForm articleForm,
                                                     @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article Not found"));

        if (!article.getAuthor().equals(loginMember)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
        }

        Article updatedArticle = this.articleService.editArticle(article, articleForm.getTitle(), articleForm.getContent(), LocalDateTime.now());
        return ResponseEntity.ok(updatedArticle);
    }

    // gather 개별 게시물 삭제
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/gather/{id}")
    @Operation(summary = "같이탈사람 게시판 게시물 삭제", description = "같이탈사람 게시판의 게시물 삭제하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시물 삭제 성공", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "게시물 삭제 실패", content = @Content),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림", content = @Content)
    })
    public ResponseEntity<String> deleteGatherArticle(@PathVariable("id") Long id, @RequestHeader("Authorization") String auth) {
        Member loginMember = this.memberService.getMemberByToken(auth)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));

        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article Not found"));

        if (!article.getAuthor().equals(loginMember)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
        }

        this.articleService.deleteArticle(article);
        return ResponseEntity.ok("Deleted");
    }
}
