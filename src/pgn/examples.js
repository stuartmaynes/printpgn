export function examples() {
let game1 = `[Event "The Opera House Game"]
[Site "Paris FRA"]
[Date "1858.??.??"]
[Round "?"]
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[Result "1-0"]
[EventDate "?"]
[ECO "C41"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "33"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 {This is a weak move already. — Fischer} 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 {Black is in what's like a zugzwang position here. He can't develop the [queen's] knight because the pawn is hanging, the bishop is blocked because of the queen. — Fischer} 9... b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 {And now for the memorable checkmating combination} 16. Qb8+!! Nxb8 17. Rd8# 1-0
    `
let game2 = `[Event "Fischer - Spassky World Championship Match 1972"]
[Site "Reykjavik ISL"]
[Date "1972.07.23"]
[EventDate "?"]
[Round "6"]
[Result "1-0"]
[White "Robert James Fischer"]
[Black "Boris Spassky"]
[ECO "D59"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "81"]

1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6
7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6
12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7
17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7
22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5
27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7
32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8
37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0


[Event "Spassky - Fischer World Championship Match 1972"]
[Site "Reykjavik ISL"]
[Date "1972.08.10"]
[EventDate "?"]
[Round "13"]
[Result "0-1"]
[White "Boris Spassky"]
[Black "Robert James Fischer"]
[ECO "B04"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "148"]

1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 g6 5. Bc4 Nb6 6. Bb3 Bg7
7. Nbd2 O-O 8. h3 a5 9. a4 dxe5 10. dxe5 Na6 11. O-O Nc5
12. Qe2 Qe8 13. Ne4 Nbxa4 14. Bxa4 Nxa4 15. Re1 Nb6 16. Bd2 a4
17. Bg5 h6 18. Bh4 Bf5 19. g4 Be6 20. Nd4 Bc4 21. Qd2 Qd7
22. Rad1 Rfe8 23. f4 Bd5 24. Nc5 Qc8 25. Qc3 e6 26. Kh2 Nd7
27. Nd3 c5 28. Nb5 Qc6 29. Nd6 Qxd6 30. exd6 Bxc3 31. bxc3 f6
32. g5 hxg5 33. fxg5 f5 34. Bg3 Kf7 35. Ne5+ Nxe5 36. Bxe5 b5
37. Rf1 Rh8 38. Bf6 a3 39. Rf4 a2 40. c4 Bxc4 41. d7 Bd5
42. Kg3 Ra3+ 43. c3 Rha8 44. Rh4 e5 45. Rh7+ Ke6 46. Re7+ Kd6
47. Rxe5 Rxc3+ 48. Kf2 Rc2+ 49. Ke1 Kxd7 50. Rexd5+ Kc6
51. Rd6+ Kb7 52. Rd7+ Ka6 53. R7d2 Rxd2 54. Kxd2 b4 55. h4 Kb5
56. h5 c4 57. Ra1 gxh5 58. g6 h4 59. g7 h3 60. Be7 Rg8 61. Bf8
h2 62. Kc2 Kc6 63. Rd1 b3+ 64. Kc3 h1=Q 65. Rxh1 Kd5 66. Kb2
f4 67. Rd1+ Ke4 68. Rc1 Kd3 69. Rd1+ Ke2 70. Rc1 f3 71. Bc5
Rxg7 72. Rxc4 Rd7 73. Re4+ Kf1 74. Bd4 f2 0-1`

return [game1, game2]
}
