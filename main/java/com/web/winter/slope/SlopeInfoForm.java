package com.web.winter.slope;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SlopeInfoForm {

    @JsonProperty("코스명")
    private String courseName;
    
    @JsonProperty("세부코스")
    private String subCourse;

    @JsonProperty("운영상태_슬로프")
    private String slopeStatus;

    @JsonProperty("운영상태_리프트")
    private String liftStatus;

    @JsonProperty("난이도")
    private String level;

    @JsonProperty("길이")
    private String length;

    @JsonProperty("면적")
    private String area;

    @JsonProperty("평균경사도")
    private String avgSlope;

    @JsonProperty("최대경사도")
    private String maxSlope;

    @JsonProperty("최소경사도")
    private String minSlope;
}
