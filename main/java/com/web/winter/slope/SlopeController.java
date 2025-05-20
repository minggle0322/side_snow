package com.web.winter.slope;

import com.web.winter.article.Article;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/slopeInfo")
@RestController
public class SlopeController {
    private final SlopeService slopeService;
    // 스키장별

    // 정보별

    // 크롤링
    @PostMapping("/{resort}")
    @Operation(summary = "스키장 크롤링 데이터", description = "스키장별 크롤링한 데이터 -> 파싱")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "데이터 전송 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(type = "array", implementation = SlopeInfoForm.class))),
            @ApiResponse(responseCode = "400", description = "데이터 전송 실패",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<List<SlopeInfoForm>> slopeInfo(@RequestBody RawDataForm rawDataForm,
                                                         @PathVariable("resort") String resort) {
        List<List<String>> rawData = rawDataForm.getSlope_data();
        List<SlopeInfoForm> slopeData = slopeService.parseSlopeData(resort, rawData);

        return ResponseEntity.ok(slopeData);
    }
}
