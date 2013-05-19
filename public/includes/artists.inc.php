<?php
$artists = array(
    (object) array('name' => 'Rahima Fitzwilliam Hall', 'uri' => ''),
    (object) array('name' => 'Tom Harris', 'uri' => ''),
    (object) array('name' => 'Sam Rawlings', 'uri' => ''),
    (object) array('name' => 'Carl Laurence', 'uri' => ''),
    (object) array('name' => 'Megan Leonie Hall', 'uri' => ''),
    (object) array('name' => 'Bryn Hall', 'uri' => ''),
    (object) array('name' => 'Guy J Jackson', 'uri' => ''),
    (object) array('name' => 'Jude Melling', 'uri' => ''),
    (object) array('name' => 'Liz Adams', 'uri' => ''),
    (object) array('name' => 'Maddie Joyce', 'uri' => ''),
    (object) array('name' => 'Tom Hirons', 'uri' => ''),
    (object) array('name' => 'Inua Ellams', 'uri' => ''),
    (object) array('name' => 'Maria Drummey', 'uri' => ''),
    (object) array('name' => 'Emma Day', 'uri' => ''),
    (object) array('name' => 'William Kherbeck', 'uri' => ''),
    (object) array('name' => 'Vincent Gillan', 'uri' => ''),
    (object) array('name' => 'Kirsty Alison', 'uri' => ''),
    (object) array('name' => 'Lola Dupre', 'uri' => ''),
    (object) array('name' => 'Laura Dockrill', 'uri' => ''),
    (object) array('name' => 'Nikki Pinder', 'uri' => ''),
    (object) array('name' => 'Will Conway', 'uri' => ''),
    (object) array('name' => 'Rima Staines', 'uri' => ''),
    (object) array('name' => 'Lee Holland', 'uri' => ''),
    (object) array('name' => 'Jo Tedds', 'uri' => ''),
    (object) array('name' => 'Jodie Daber', 'uri' => ''),
    (object) array('name' => 'Andrew Walter', 'uri' => ''),
    (object) array('name' => 'Zoe Catherine Kendall', 'uri' => ''),
    (object) array('name' => 'Jeannie Paske', 'uri' => ''),
    (object) array('name' => 'Mat Lloyd', 'uri' => ''),
    (object) array('name' => 'James Kamo', 'uri' => ''),
    (object) array('name' => 'Musa Okwonga', 'uri' => ''),
    (object) array('name' => 'Jake Ellis', 'uri' => ''),
    (object) array('name' => 'Hannah Stephenson', 'uri' => ''),
    (object) array('name' => 'Zophiel Webb', 'uri' => ''),
    (object) array('name' => 'Adam Green', 'uri' => ''),
    (object) array('name' => 'Paula Afonso', 'uri' => ''),
    (object) array('name' => 'Francis K Wolfe', 'uri' => ''),
    (object) array('name' => 'Diego Mallo', 'uri' => ''),
    (object) array('name' => 'Vincent J Prince', 'uri' => ''),
    (object) array('name' => 'Matt Black', 'uri' => ''),
    (object) array('name' => 'Rupert J. Munck', 'uri' => ''),
    (object) array('name' => 'Mina Milk', 'uri' => ''),
    (object) array('name' => 'Charlie Cottrell', 'uri' => ''),
    (object) array('name' => 'Paul Bloom', 'uri' => ''),
    (object) array('name' => 'Claire Fletcher', 'uri' => ''),
    (object) array('name' => 'Tim Greaves', 'uri' => ''),
    (object) array('name' => 'Alexander Aspinall', 'uri' => ''),
    (object) array('name' => 'Sorana Santos', 'uri' => ''),
    (object) array('name' => 'Kaitlin Beckett', 'uri' => ''),
    (object) array('name' => 'Daniel Chidgey', 'uri' => ''),
    (object) array('name' => 'Eliza Gregory', 'uri' => ''),
    (object) array('name' => 'Dan Prescott', 'uri' => ''),
    (object) array('name' => 'Stacie Withers', 'uri' => ''),
    (object) array('name' => 'Claud Forsbrey', 'uri' => ''),
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
                      <h2>' . $artist->name . '</h2>
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