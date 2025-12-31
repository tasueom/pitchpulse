package com.tasueom.pitchpulse.controller;

import com.tasueom.pitchpulse.service.StandingsService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/leagues")
public class LeagueController {

    private final StandingsService standingsService;

    public LeagueController(StandingsService standingsService) {
        this.standingsService = standingsService;
    }

    @GetMapping("/{leagueId}/standings")
    public Mono<String> standings(
            @PathVariable int leagueId,
            @RequestParam int season
    ) {
        return standingsService.fetchStandings(leagueId, season);
    }
}
