package com.web.winter.slope;

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
    public ResponseEntity<List<SlopeInfoForm>> slopeInfo(@RequestBody RawDataForm rawDataForm,
                                                         @PathVariable("resort") String resort) {
        List<List<String>> rawData = rawDataForm.getSlope_data();
        List<SlopeInfoForm> slopeData = slopeService.parseSlopeData(resort, rawData);

        return ResponseEntity.ok(slopeData);
    }
}
