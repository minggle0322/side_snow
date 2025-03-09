package com.web.winter.article;

import com.web.winter.member.Member;
import com.web.winter.member.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/articles")
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
    public ResponseEntity<Article> createArticle(@RequestBody @Valid ArticleForm articleForm, Principal principal) {
        Member member = this.memberService.getMember(principal.getName());
        Article article = this.articleService.create(articleForm, member);

        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    @GetMapping("/free/{id}")
    public ResponseEntity<Article> freeArticle(@PathVariable("id") Long id) {
        Optional<Article> article = this.articleService.getArticle(id);

        return article.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // update - /free/{id}
    // delete - /free/{id}

    // gather
    @GetMapping("/gather")
    public ResponseEntity<List<Article>> gatherArticles() {
        List<Article> gatherArticles = articleService.getGatherArticles();

        return ResponseEntity.ok(gatherArticles);
    }
}
