package com.tasueom.pitchpulse.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class StandingsService {

    private final WebClient webClient;

    public StandingsService() {
        String apiKey = System.getenv("API_FOOTBALL_KEY");

        this.webClient = WebClient.builder()
                .baseUrl("https://v3.football.api-sports.io")
                .defaultHeader("x-apisports-key", apiKey)
                .build();
    }

    public Mono<String> fetchStandings(int leagueId, int season) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/standings")
                        .queryParam("league", leagueId)
                        .queryParam("season", season)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}
