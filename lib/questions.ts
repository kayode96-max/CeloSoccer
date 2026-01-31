export interface Question {
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    text: 'Which club has won the most UEFA Champions League / European Cup titles?',
    options: ['Real Madrid', 'AC Milan', 'Bayern Munich', 'Liverpool'],
    correctIndex: 0,
    explanation:
      'Real Madrid holds the record with 15 UEFA Champions League titles, cementing their dominance in European club football.',
  },
  {
    text: 'Who is the all-time top scorer in FIFA World Cup history?',
    options: ['Cristiano Ronaldo', 'Lionel Messi', 'Ronaldo Nazário', 'Miroslav Klose'],
    correctIndex: 3,
    explanation:
      'Miroslav Klose scored 16 World Cup goals across his career, holding the all-time record before it was surpassed.',
  },
  {
    text: 'Which organization governs soccer in Europe?',
    options: ['FIFA', 'CONMEBOL', 'UEFA', 'AFC'],
    correctIndex: 2,
    explanation:
      'UEFA (Union of European Football Associations) is the governing body for football in Europe, organizing major tournaments.',
  },
  {
    text: 'Which manager led Manchester City to their first-ever Premier League title?',
    options: ['José Mourinho', 'Roberto Mancini', 'Pep Guardiola', 'Claudio Ranieri'],
    correctIndex: 1,
    explanation:
      'Roberto Mancini delivered Manchester City\'s first Premier League title in 2012, marking a turning point for the club.',
  },
  {
    text: 'What is the name of the annual competition between the top domestic league champions of South America?',
    options: ['Copa América', 'Copa Libertadores', 'Copa del Rey', 'Sudamericana'],
    correctIndex: 1,
    explanation:
      'The Copa Libertadores is South America\'s premier club competition, founded in 1960 and won by legendary teams.',
  },
  {
    text: 'Which country has won the most FIFA World Cup titles?',
    options: ['Germany', 'Italy', 'Brazil', 'Argentina'],
    correctIndex: 2,
    explanation:
      'Brazil has won 5 FIFA World Cup titles, more than any other nation, establishing themselves as a football powerhouse.',
  },
  {
    text: 'Which English competition is known as "The FA Cup"?',
    options: [
      'The Premier League',
      'The League Cup',
      'The Community Shield',
      'The Football Association Challenge Cup',
    ],
    correctIndex: 3,
    explanation:
      'The FA Cup, officially the Football Association Challenge Cup, is England\'s oldest knockout tournament, dating back to 1871.',
  },
  {
    text: 'Who managed Barcelona during their historic 2010–11 Champions League-winning season?',
    options: ['Rafael Benítez', 'Pep Guardiola', 'Luis Enrique', 'Tito Vilanova'],
    correctIndex: 1,
    explanation:
      'Pep Guardiola orchestrated Barcelona\'s treble-winning season (2010-11) with stunning attacking football.',
  },
  {
    text: 'Which confederation governs soccer in Africa?',
    options: ['AFC', 'OFC', 'CONCACAF', 'CAF'],
    correctIndex: 3,
    explanation:
      'CAF (Confederation of African Football) is the governing body for African football, organizing the African Cup of Nations.',
  },
  {
    text: 'The "Serie A" is the top-tier football league in which country?',
    options: ['Spain', 'Portugal', 'Italy', 'France'],
    correctIndex: 2,
    explanation: 'Serie A is Italy\'s top football division, home to iconic clubs like AC Milan, Inter Milan, and Juventus.',
  },
  {
    text: 'Which tournament is held every four years and features national teams from the Americas?',
    options: ['Copa América', 'Gold Cup', 'FIFA World Cup', 'Olympic Games'],
    correctIndex: 0,
    explanation:
      'Copa América is held every four years, bringing together the best national teams from South and North America.',
  },
  {
    text: 'Who holds the record for the most international goals scored by a men\'s national team player?',
    options: ['Cristiano Ronaldo', 'Ali Daei', 'Lionel Messi', 'Pelé'],
    correctIndex: 0,
    explanation:
      'Cristiano Ronaldo surpassed previous records to become the all-time leading international goal scorer with over 130 goals.',
  },
  {
    text: 'Which club did Kevin Keegan famously leave in 1977 to join Hamburg in Germany?',
    options: ['Manchester United', 'Arsenal', 'Liverpool', 'Everton'],
    correctIndex: 2,
    explanation:
      'Kevin Keegan left Liverpool in 1977 to join Hamburger SV, continuing his legendary playing career in Germany.',
  },
  {
    text: 'The "Bundesliga" is the top football league in which country?',
    options: ['Austria', 'Switzerland', 'Netherlands', 'Germany'],
    correctIndex: 3,
    explanation:
      'Bundesliga is Germany\'s top football division, known for its competitive nature and passionate fan culture.',
  },
  {
    text: 'Which manager is known as "The Special One"?',
    options: ['José Mourinho', 'Zinedine Zidane', 'Carlo Ancelotti', 'Maurizio Sarri'],
    correctIndex: 0,
    explanation:
      'José Mourinho famously called himself "The Special One" upon joining Chelsea in 2004, a phrase that stuck with him.',
  },
  {
    text: 'Which annual club competition is organized by UEFA for the second-best domestic teams?',
    options: ['UEFA Super Cup', 'UEFA Europa League', 'UEFA Nations League', 'UEFA Conference League'],
    correctIndex: 1,
    explanation:
      'UEFA Europa League is Europe\'s second-tier club competition, offering a pathway for ambitious teams to European glory.',
  },
];
