package com.web.winter.comment;

import com.web.winter.article.Article;
import com.web.winter.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Optional<Comment> getComment(Long id) {
        return this.commentRepository.findById(id);
    }

    public Comment createComment(CommentForm commentForm, Article article, Member author) {
        Comment comment = new Comment(commentForm.getContent(), author, LocalDateTime.now(), article);

        return this.commentRepository.save(comment);
    }

    public Comment editComment(Comment comment, String content, LocalDateTime editTime) {
        comment.edit(content, editTime);
        return this.commentRepository.save(comment);
    }

    public void delete(Comment comment) {
        this.commentRepository.delete(comment);
    }
}
