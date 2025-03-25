package com.web.winter.article;

import com.web.winter.comment.Comment;
import com.web.winter.member.Member;
import com.web.winter.member.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/article")
public class ArticleController {
    private final ArticleService articleService;
    private final MemberService memberService;

    // free
    @GetMapping("/free")
    public ResponseEntity<List<Article>> freeArticles() {
        List<Article> freeArticles = articleService.getFreeArticles();

        return ResponseEntity.ok(freeArticles);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/free")
    public ResponseEntity<Article> createFreeArticle(@RequestBody @Valid ArticleForm articleForm, Principal principal) {
        Member member = this.memberService.getMember(principal.getName());
        Article article = this.articleService.createFreeArticle(articleForm, member);

        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    @GetMapping("/free/{id}")
    public ResponseEntity<GetArticleForm> freeArticle(@PathVariable("id") Long id) {
        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));
        List<Comment> commentList = this.articleService.getCommentList(article);

        GetArticleForm getArticleForm = new GetArticleForm(article, commentList);

        return ResponseEntity.ok(getArticleForm);
    }

    // update - /free/{id}
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/free/{id}")
    public ResponseEntity<Article> editArticle(@PathVariable("id") Long id, @RequestBody @Valid ArticleForm articleForm) {
        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

        Article updated = this.articleService.edit(article, articleForm.getTitle(), articleForm.getContent(), LocalDateTime.now());

        return ResponseEntity.ok(updated);
    }

    // delete - /free/{id}
    @DeleteMapping("/free/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable("id") Long id) {
        Article article = this.articleService.getArticle(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

        this.articleService.delete(article);

        return ResponseEntity.ok("Deleted");
    }

    // gather
    @GetMapping("/gather")
    public ResponseEntity<List<Article>> gatherArticles() {
        List<Article> gatherArticles = articleService.getGatherArticles();

        return ResponseEntity.ok(gatherArticles);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/gather")
    public ResponseEntity<Article> createGatherArticle(@RequestBody @Valid ArticleForm articleForm, Principal principal) {
        Member member = this.memberService.getMember(principal.getName());
        Article article = this.articleService.createGatherArticle(articleForm, member);

        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }
}
