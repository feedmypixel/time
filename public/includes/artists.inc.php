<?php

$artists = array(
    (object) array('name' => 'Rahima Fitzwilliam Hall', 'uri' => 'himihall'),
    (object) array('name' => 'Tom Harris', 'uri' => 'journal/tom-harris-five-things'),
    (object) array('name' => 'Sam Rawlings', 'uri' => 'samrawlings'),
    (object) array('name' => 'Carl Laurence', 'uri' => 'journal/carl-laurences-five-things'),
    (object) array('name' => 'Megan Leonie Hall', 'uri' => 'journal/megan-leonie-halls-five-things'),
    (object) array('name' => 'Bryn Hall', 'uri' => 'journal/bryn-halls-five-things'),
    (object) array('name' => 'Guy J Jackson', 'uri' => 'journal/guy-j-jacksons-five-things'),
    (object) array('name' => 'Jude Melling', 'uri' => 'journal/jude-mellings-five-things'),
    (object) array('name' => 'Liz Adams', 'uri' => 'journal/liz-adams-five-things'),
    (object) array('name' => 'Maddie Joyce', 'uri' => 'maddiejoyce'),
    (object) array('name' => 'Tom Hirons', 'uri' => 'journal/tom-hirons-five-things'),
    (object) array('name' => 'Inua Ellams', 'uri' => 'journal/inua-ellams-five-things'),
    (object) array('name' => 'Maria Drummey', 'uri' => 'journal/maria-drummeys-five-things'),
    (object) array('name' => 'Emma Day', 'uri' => 'emmadayphotography'),
    (object) array('name' => 'William Kherbek', 'uri' => 'modredssarcophagi'),
    (object) array('name' => 'Vincent Gillan', 'uri' => 'vincentgillan'),
    (object) array('name' => 'Kirsty Allison', 'uri' => 'kirstyallison'),
    (object) array('name' => 'Lola Dupre', 'uri' => 'loladupre'),
    (object) array('name' => 'Laura Dockrill', 'uri' => 'journal/laura-dockrills-five-things'),
    (object) array('name' => 'Nikki Pinder', 'uri' => 'nikkipinder'),
    (object) array('name' => 'Will Conway', 'uri' => 'journal/will-conways-five-things'),
    (object) array('name' => 'Rima Staines', 'uri' => 'thehermitage'),
    (object) array('name' => 'Lee Holland', 'uri' => 'leeholland'),
    (object) array('name' => 'Jo Tedds', 'uri' => 'journal/jo-tedds-five-things'),
    (object) array('name' => 'Jodie Daber', 'uri' => 'jodiedaber'),
    (object) array('name' => 'Andrew Walter', 'uri' => 'journal/andrew-walters-five-things'),
    (object) array('name' => 'Zoe Catherine Kendall', 'uri' => 'journal/zoe-catherine-kendalls-five-things'),
    (object) array('name' => 'Jeannie Paske', 'uri' => 'journal/jeannie-paskes-five-things'),
    (object) array('name' => 'Mat Lloyd', 'uri' => 'journal/mat-lloyds-five-things'),
    (object) array('name' => 'James Kamo', 'uri' => 'furryrocks'),
    (object) array('name' => 'Musa Okwonga', 'uri' => 'http://www.okwonga.com/'),
    (object) array('name' => 'Jake Ellis', 'uri' => 'jake_ellis'),
    (object) array('name' => 'Hannah Stephenson', 'uri' => 'journal/hannah-stephensons-five-things'),
    (object) array('name' => 'Zophiel Webb', 'uri' => 'journal/zophiel-webbs-five-things'),
    (object) array('name' => 'Adam Green', 'uri' => 'journal/adam-greens-five-things'),
    (object) array('name' => 'Paula Afonso', 'uri' => ''),
    (object) array('name' => 'Francis K Wolfe', 'uri' => 'franceskwolfe'),
    (object) array('name' => 'Diego Mallo', 'uri' => 'http://www.diegomallo.com/'),
    (object) array('name' => 'Vincent J Prince', 'uri' => 'journal/vincent-j-princes-five-things'),
    (object) array('name' => 'Matt Black', 'uri' => 'journal/matt-blacks-five-things'),
    (object) array('name' => 'Rupert J. Munck', 'uri' => 'rupertjmunck'),
    (object) array('name' => 'Mina Milk', 'uri' => 'mina_milk'),
    (object) array('name' => 'Charlie Cottrell', 'uri' => 'charliecottrell'),
    (object) array('name' => 'Paul Bloom', 'uri' => 'pauladambloom'),
    (object) array('name' => 'Claire Fletcher', 'uri' => 'journal/claire-fletchers-five-things'),
    (object) array('name' => 'Tim Greaves', 'uri' => ''),
    (object) array('name' => 'Alexander Aspinall', 'uri' => 'alexanderaspinall'),
    (object) array('name' => 'Sorana Santos', 'uri' => 'journal/sorana-santos-five-things'),
    (object) array('name' => 'Kaitlin Beckett', 'uri' => 'journal/kaitlin-becketts-five-things'),
    (object) array('name' => 'Daniel Chidgey', 'uri' => ''),
    (object) array('name' => 'Eliza Gregory', 'uri' => 'journal/eliza-gregorys-five-things'),
    (object) array('name' => 'Dan Prescott', 'uri' => 'd_j_prescott'),
    (object) array('name' => 'Stacie Withers', 'uri' => 'journal/stacie-withers-five-things'),
    (object) array('name' => 'Claud Forsbrey', 'uri' => 'claudforsb'),
);

$i = 1;
$horizontal = $vertical = 0;
$html = '<div class="center-positioned full-width">
            <ul class="artists group">
                <li class="separator"></li>';

foreach ($artists as $artist) {

    $lastListInSectionClass = (($i % 6) === 0) ? 'last' : '';

    $artistUri = 'http' === substr($artist->uri, 0, 4) ? $artist->uri : 'http://www.lazygramophone.com/' . $artist->uri;

    $className = strtolower(str_replace(' ', '-', $artist->name));

    $style = 'background-position: ' . ($horizontal === 0 ? $horizontal : '-' . $horizontal . 'px') .' '
                                     . ($vertical === 0 ? $vertical : '-' . $vertical . 'px');

    $html .= '<li class="' . $lastListInSectionClass . '">
                  <a href="' . $artistUri . '" target="_blank">
                      <span style="' . $style . '"></span>
                      <h4 class="artist-name">' . $artist->name . '</h4>
                  </a>
              </li>';


    $horizontal += 40;

    if (($i % 10) === 0) {
        $horizontal = 0;
        $vertical += 40;
    }

    if (($i % 6) === 0 && $i !== count($artists)) {
        $html .= '<li class="separator"></li>';
    }

    $i++;
}

$html .= '</ul>
       </div>';

echo $html;