<?php
class Lazy_TwitterButton
{
    protected $_href                = 'http://twitter.com/share';
    protected $_class               = 'twitter-share-button';
    protected $_dataUrl             = null;
    protected $_dataText            = null;
    protected $_dataCount;
    protected $_dataCountOptions    = array('vertical', 'horizontal', 'none');
    protected $_dataVia             = null;
    protected $_dataRelated         = null;
    protected $_buttonText          = '';

    public function __construct(array $options = null)
    {
      if (is_array($options)) {
          $this->setOptions($options);
      }
    }

    public function setOptions($options)
    {
        $methods = get_class_methods($this);

        foreach ($options as $key => $value) {

            $methodParts = explode('-', $key);

            foreach ($methodParts as $k => $v) {
                $methodParts[$k] = ucfirst($methodParts[$k]);
            }

            $method = 'set' . implode('', $methodParts);

            if (in_array($method, $methods)) {
                $this->$method($value);
            }
        }
    }

    public function setDataUrl($url)
    {
        $this->_dataUrl = (string) $url;
        return $this;
    }
    
    public function setDataText($text)
    {
        $this->_dataText = (string) $text;
        return $this;
    }

    public function setDataCount($count)
    {
        $countOptions = implode(', ', $this->_dataCountOptions);

        if (!in_array($count, $this->_dataCountOptions))
            throw new Exception("Invalid value for data-count. It must be one of {$countOptions}");

        $this->_dataCount = $count;
        return $this;
    }

    public function setDataVia($via)
    {
        $this->_dataVia = (string) $via;
        return $this;
    }

    public function setDataRelated($related)
    {
        $this->_dataRelated = (string) $related;
        return $this;
    }

    public function render()
    {

        $s = '';

        $s .= '<a ';
        $s .= "href=\"{$this->_href}\" ";
        $s .= "class=\"{$this->_class}\" ";
        $s .= $this->_dataUrl ? "data-url=\"{$this->_dataUrl}\" " : '';
        $s .= $this->_dataText ? "data-text=\"{$this->_dataText}\" " : '';
        $s .= "data-count=\"{$this->_dataCount}\" ";
        $s .= $this->_dataVia ? "data-via=\"{$this->_dataVia}\" " : '';
        $s .= $this->_dataRelated ? "data-via=\"{$this->_dataRelated}\" " : '';
        $s .= '>';
        $s .= $this->_buttonText;
        $s .= '</a>';

        return $s;
    }

}