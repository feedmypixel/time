<?php
$artists = array(
    (object) array('name' => 'Rahima Fitzwilliam Hall', 'uri' => ''),
    (object) array('name' => 'Tom Harris', 'uri' => 'tom-harris-five-things'),
    (object) array('name' => 'Sam Rawlings', 'uri' => 'samrawlings'),
    (object) array('name' => 'Carl Laurence', 'uri' => 'carl-laurences-five-things'),
    (object) array('name' => 'Megan Leonie Hall', 'uri' => 'megan-leonie-halls-five-things'),
    (object) array('name' => 'Bryn Hall', 'uri' => 'bryn-halls-five-things'),
    (object) array('name' => 'Guy J Jackson', 'uri' => 'guy-j-jacksons-five-things'),
    (object) array('name' => 'Jude Melling', 'uri' => 'jude-mellings-five-things'),
    (object) array('name' => 'Liz Adams', 'uri' => 'liz-adams-five-things'),
    (object) array('name' => 'Maddie Joyce', 'uri' => 'maddiejoyce'),
    (object) array('name' => 'Tom Hirons', 'uri' => 'tom-hirons-five-things'),
    (object) array('name' => 'Inua Ellams', 'uri' => 'inua-ellams-five-things'),
    (object) array('name' => 'Maria Drummey', 'uri' => 'maria-drummeys-five-things'),
    (object) array('name' => 'Emma Day', 'uri' => 'emmadayphotography'),
    (object) array('name' => 'William Kherbek', 'uri' => 'modredssarcophagi'),
    (object) array('name' => 'Vincent Gillan', 'uri' => 'vincentgillan'),
    (object) array('name' => 'Kirsty Allison', 'uri' => 'kirstyallison'),
    (object) array('name' => 'Lola Dupre', 'uri' => 'loladupre'),
    (object) array('name' => 'Laura Dockrill', 'uri' => 'laura-dockrills-five-things'),
    (object) array('name' => 'Nikki Pinder', 'uri' => 'nikkipinder'),
    (object) array('name' => 'Will Conway', 'uri' => 'will-conways-five-things'),
    (object) array('name' => 'Rima Staines', 'uri' => 'thehermitage'),
    (object) array('name' => 'Lee Holland', 'uri' => 'leeholland'),
    (object) array('name' => 'Jo Tedds', 'uri' => 'jo-tedds-five-things'),
    (object) array('name' => 'Jodie Daber', 'uri' => 'jodiedaber'),
    (object) array('name' => 'Andrew Walter', 'uri' => 'andrew-walters-five-things'),
    (object) array('name' => 'Zoe Catherine Kendall', 'uri' => 'zoe-catherine-kendalls-five-things'),
    (object) array('name' => 'Jeannie Paske', 'uri' => 'jeannie-paskes-five-things'),
    (object) array('name' => 'Mat Lloyd', 'uri' => 'mat-lloyds-five-things'),
    (object) array('name' => 'James Kamo', 'uri' => 'furryrocks'),
    (object) array('name' => 'Musa Okwonga', 'uri' => ''),
    (object) array('name' => 'Jake Ellis', 'uri' => 'jake_ellis'),
    (object) array('name' => 'Hannah Stephenson', 'uri' => 'hannah-stephensons-five-things'),
    (object) array('name' => 'Zophiel Webb', 'uri' => 'zophiel-webbs-five-things'),
    (object) array('name' => 'Adam Green', 'uri' => 'adam-greens-five-things'),
    (object) array('name' => 'Paula Afonso', 'uri' => 'polinafonso'),
    (object) array('name' => 'Francis K Wolfe', 'uri' => 'franceskwolfe'),
    (object) array('name' => 'Diego Mallo', 'uri' => ''),
    (object) array('name' => 'Vincent J Prince', 'uri' => 'vincent-j-princes-five-things'),
    (object) array('name' => 'Matt Black', 'uri' => 'matt-blacks-five-things'),
    (object) array('name' => 'Rupert J. Munck', 'uri' => 'rupertjmunck'),
    (object) array('name' => 'Mina Milk', 'uri' => 'mina_milk'),
    (object) array('name' => 'Charlie Cottrell', 'uri' => 'charliecottrell'),
    (object) array('name' => 'Paul Bloom', 'uri' => 'pauladambloom'),
    (object) array('name' => 'Claire Fletcher', 'uri' => 'claire-fletchers-five-things'),
    (object) array('name' => 'Tim Greaves', 'uri' => ''),
    (object) array('name' => 'Alexander Aspinall', 'uri' => 'alexanderaspinall'),
    (object) array('name' => 'Sorana Santos', 'uri' => 'sorana-santos-five-things'),
    (object) array('name' => 'Kaitlin Beckett', 'uri' => 'kaitlin-becketts-five-things'),
    (object) array('name' => 'Daniel Chidgey', 'uri' => ''),
    (object) array('name' => 'Eliza Gregory', 'uri' => 'eliza-gregorys-five-things'),
    (object) array('name' => 'Dan Prescott', 'uri' => 'd_j_prescott'),
    (object) array('name' => 'Stacie Withers', 'uri' => 'stacie-withers-five-things'),
    (object) array('name' => 'Claud Forsbrey', 'uri' => 'claudforsb'),
);

$i = $horizontal = $vertical = 0;
$html = '<div class="center-positioned full-width">
            <ul class="artists group">
                <li class="separator"></li>';

foreach ($artists as $artist) {

    $className = strtolower(str_replace(' ', '-', $artist->name));

    $style = 'background-position: ' . ($horizontal === 0 ? $horizontal : '-' . $horizontal . 'px') .' '
                                     . ($vertical === 0 ? $vertical : '-' . $vertical . 'px');

    $html .= '<li>
                  <a href="http://www.lazygramophone.com/' . $artist->uri . '">
                      <span style="' . $style . '"></span>
                      <h4 class="highlight artist-name">' . $artist->name . '</h4>
                  </a>
              </li>
              <li class="separator"></li>';

    $i++;
    $horizontal += 80;

    if (($i % 10) === 0) {
        $horizontal = 0;
        $vertical += 80;
    }
}

$html .= '</ul>
       </div>';

echo $html;