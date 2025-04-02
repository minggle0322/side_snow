package com.web.winter.article;

import com.web.winter.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetArticleForm {
    private Article article;

    private List<Comment> commentList;
}
