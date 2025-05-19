package com.web.winter.slope;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
public class SlopeService {

    private final Map<String, Function<List<List<String>>, List<SlopeInfoForm>>> parserMap;

    public SlopeService() {
        this.parserMap = new HashMap<>();
        parserMap.put("high1", this::parseHigh1);
        parserMap.put("jisan", this::parseJisan);
        parserMap.put("konjiam", this::parseKonjiam);
    }

    public List<SlopeInfoForm> parseSlopeData(String resort, List<List<String>> rawData) {
        Function<List<List<String>>, List<SlopeInfoForm>> parser = parserMap.get(resort);
        if (parser == null) throw new IllegalArgumentException("지원하지 않는 리조트");
        return parser.apply(rawData);
    }

    public List<SlopeInfoForm> parseHigh1 (List<List<String>> rawData) {
        List<SlopeInfoForm> slopeData = new ArrayList<>();
        String currentSlopeName = null;

        for (List<String> row : rawData) {
            if (row.size() < 10) continue;

            SlopeInfoForm slopeInfoForm = new SlopeInfoForm();

            // 코스명이 있을 경우 업데이트, 없으면 이전 값 유지
            if (row.get(0).contains("(")) {
                currentSlopeName = row.get(0).replace("\n", " ").trim();
                slopeInfoForm.setCourseName(currentSlopeName);
                slopeInfoForm.setSubCourse(row.get(1));
                slopeInfoForm.setSlopeStatus(row.get(2));
                slopeInfoForm.setLiftStatus(row.get(3));
                slopeInfoForm.setLevel(row.get(4));
                slopeInfoForm.setLength(row.get(5));
                slopeInfoForm.setArea(row.get(6));
                slopeInfoForm.setAvgSlope(row.get(7));
                slopeInfoForm.setMaxSlope(row.get(8));
                slopeInfoForm.setMinSlope(row.get(9));
            } else {
                slopeInfoForm.setCourseName(currentSlopeName);
                slopeInfoForm.setSubCourse(row.get(0));
                slopeInfoForm.setSlopeStatus(row.get(1));
                slopeInfoForm.setLiftStatus(row.get(2));
                slopeInfoForm.setLevel(row.get(3));
                slopeInfoForm.setLength(row.get(4));
                slopeInfoForm.setArea(row.get(5));
                slopeInfoForm.setAvgSlope(row.get(6));
                slopeInfoForm.setMaxSlope(row.get(7));
                slopeInfoForm.setMinSlope(row.get(8));
            }

            slopeData.add(slopeInfoForm);
        }
        return slopeData;
    }

    public List<SlopeInfoForm> parseJisan (List<List<String>> rawData) {
        List<SlopeInfoForm> slopeData = new ArrayList<>();

        SlopeInfoForm slope = new SlopeInfoForm();
        slope.setCourseName("뉴오렌지");
        slope.setSubCourse("Ⅰ");
        slope.setSlopeStatus("OPEN");
        slope.setLiftStatus("OPEN");
        slope.setLevel("개미친상급");
        slope.setLength("1,000");
        slope.setArea("100.00");
        slope.setAvgSlope("10.0");
        slope.setMaxSlope("10.0");
        slope.setMinSlope("10.0");

        slopeData.add(slope);
        return slopeData;
    }

    public List<SlopeInfoForm> parseKonjiam (List<List<String>> rawData) {
        List<SlopeInfoForm> slopeData = new ArrayList<>();

        SlopeInfoForm slope = new SlopeInfoForm();
        slope.setCourseName("곤지암");
        slope.setSubCourse("Ⅰ");
        slope.setSlopeStatus("OPEN");
        slope.setLiftStatus("OPEN");
        slope.setLevel("개미친상급");
        slope.setLength("1,000");
        slope.setArea("100.00");
        slope.setAvgSlope("10.0");
        slope.setMaxSlope("10.0");
        slope.setMinSlope("10.0");

        slopeData.add(slope);
        return slopeData;
    }
}
