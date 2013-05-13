<?php

class Lazy_GooglePlusOne
{
    protected $_size = null;
    protected $_count = 'true';
    protected $_href = null;
    protected $_sizeOptions  = array('small', 'medium', 'tall');
    protected $_countOptions = array('true', 'false');

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
            $method = 'set' . ucfirst($key);

            if (in_array($method, $methods)) {
                $this->$method($value);
            }
        }
    }

    public function setSize($size)
    {
        $sizeOptions = implode(', ', $this->_sizeOptions);

        if (!in_array($size, $this->_sizeOptions))
            throw new Exception("Incorrect value for size, please use {$sizeOptions}");

        $this->_size = $size;
        return $this;
    }

    public function setCount($count)
    {
        $countOptions = implode(', ', $this->_countOptions);
        
        if (!in_array($count, $this->_countOptions))
            throw new Exception("Incorrect value for size, please use {$countOptions}");
        $this->_count = $count;
        return $this;
    }

    public function setHref($href)
    {
        $this->_href = $href;
        return $this;
    }

    public function render()
    {
        $s = '';
        $s .='<g:plusone';

        $s .= $this->_size ? " size=\"{$this->_size}\" " : '';
        $s .= $this->_count == 'false' ? "count=\"{$this->_count}\" " : '';
        $s .= $this->_href ? "href=\"{$this->_href}\" " : '';

        $s .= '>';
        $s .= '</g:plusone>';

        return $s;
    }
}
