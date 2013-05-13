<?php

class Lazy_FacebookLikeButton
{

    protected $_href;
    protected $_send;
    protected $_layout;
    protected $_layoutValues = array('standard', 'button_count', 'box_count');
    protected $_showFaces;
    protected $_width;
    protected $_actionValues = array('like', 'recommend');
    protected $_action;
    protected $_fontValues = array('arial', 'lucida grande', 'segoe ui', 'tahoma', 'trebuchet ms', 'verdana');
    protected $_font;
    protected $_colorValues = array('light', 'dark');
    protected $_color;
    protected $_ref;
    protected $_sendValues = array('true', 'false');
    protected $_facesValues = array('true', 'false');

    public function __construct(array $options = null)
    {
        if (is_array($options)) {
            $this->setOptions($options);
        }
    }

    public function setOptions(array $options)
    {
        $methods = get_class_methods($this);
        foreach ($options as $key => $value) {
            $methodNames = explode('_', $key);

            foreach ($methodNames as $k => $v) {
                $methodNames[$k] = ucfirst($methodNames[$k]);
            }

            $method = 'set' . implode($methodNames);

            if (in_array($method, $methods)) {
                $this->$method($value);
            }
        }
        return $this;
    }

    /**
     * href - the URL to like. The XFBML version defaults to the current page.
     * @param $url
     * @return Lazy_FacebookLikeButton
     */
    public function setHref($url)
    {
        $this->_href = (string) $url;
        return $this;
    }

    /**
     * send - specifies whether to include a Send button with the Like button. This only works with the XFBML version.
     * @throws Exception
     * @param null|string $send
     * @return Lazy_FacebookLikeButton
     */
    public function setSend($send)
    {
        if (!in_array($send, $this->_sendValues))
            throw new Exception('Incorrect value for "send" attribute!');
        else
            $this->_send = (string) $send;

        return $this;
    }

    /**
     * layout - there are three options.
     *      standard - displays social text to the right of the button and friends' profile photos below. Minimum width: 225 pixels. Default width: 450 pixels. Height: 35 pixels (without photos) or 80 pixels (with photos).
     *      button_count - displays the total number of likes to the right of the button. Minimum width: 90 pixels. Default width: 90 pixels. Height: 20 pixels.
     *      box_count - displays the total number of likes above the button. Minimum width: 55 pixels. Default width: 55 pixels. Height: 65 pixels.
     * @throws Exception
     * @param string $layout
     * @return Lazy_FacebookLikeButton
     */
    public function setLayout($layout)
    {
        if (in_array($layout, $this->_layoutValues))
            $this->_layout = (string) $layout;
        else
            throw new Exception('Incorrect value for "layout" attribute!');

        return $this;
    }

    /**
     * show_faces - specifies whether to display profile photos below the button (standard layout only)
     * @throws Exception
     * @param string $faces
     * @return Lazy_FacebookLikeButton
     */
    public function setShowFaces($faces)
    {
        if (!in_array($faces, $this->_facesValues))
            throw new Exception('Incorrect value for "show_faces" attribute!');
        else
            $this->_showFaces = (string) $faces;

        return $this;
    }

    /**
     * width - the width of the Like button.
     * @param int $width
     * @return Lazy_FacebookLikeButton
     */
    public function setWidth($width)
    {
        $this->_width = (int) $width;
        return $this;
    }

    /**
     * action - the verb to display on the button. Options: 'like', 'recommend'
     * @throws Exception
     * @param $action
     * @return Lazy_FacebookLikeButton
     */
    public function setAction($action)
    {
        if (!in_array($action, $this->_actionValues))
            throw new Exception('Incorrect value for "action" attribute!');
        else
            $this->_action = (string) $action;

        return $this;
    }

    /**
     * font - the font to display in the button. Options: 'arial', 'lucida grande', 'segoe ui', 'tahoma', 'trebuchet ms', 'verdana'
     * @throws Exception
     * @param string $font
     * @return Lazy_FacebookLikeButton
     */
    public function setFont($font)
    {
        if (!in_array($font, $this->_fontValues))
            throw new Exception('Incorrect value for "font" attribute!');
        else
            $this->_font = (string) $font;

        return $this;
    }

    /**
     * colorscheme - the color scheme for the like button. Options: 'light', 'dark'
     * @throws Exception
     * @param string $color
     * @return Lazy_FacebookLikeButton
     */
    public function setColorScheme($color)
    {
        if (!in_array($color, $this->_colorValues))
            throw new Exception('Incorrect value for "color" attribute!');
        else
            $this->_color = (string) $color;

        return $this;
    }
    /**
     * ref - a label for tracking referrals; must be less than 50 characters and can contain alphanumeric characters and some punctuation (currently +/=-.:_). The ref attribute causes two parameters to be added to the referrer URL when a user clicks a link from a stream story about a Like action:
     *      fb_ref - the ref parameter
     *      fb_source - the stream type ('home', 'profile', 'search', 'other') in which the click occurred and the story type ('oneline' or 'multiline'), concatenated with an underscore.
     * @throws Exception
     * @param string $ref
     * @return Lazy_FacebookLikeButton
     */
    public function setRef($ref)
    {
        if (strlen($ref) > 50 || preg_match('/^[^a-z0-9+/.:=-_]*$/', $ref))
            throw new Exception('Ref value must be 50 or below characters and must be alphanumeric and only contain +/.:=-_ characters');
        else
            $this->_ref = (string) $ref;

        return $this;
    }

    /**
     * @return string
     */
    public function render()
    {
        $s = '';
        $s .= '<div class="fb_like">';
        $s .= '<fb:like ';

        $s .= $this->_href ? "href=\"{$this->_href}\" " : '';
        $s .= "send=\"{$this->_send}\" ";
        $s .= "layout=\"{$this->_layout}\" ";
        $s .= "show_faces=\"{$this->_showFaces}\" ";
        $s .= "width=\"{$this->_width}\" ";
        $s .= $this->_action ? "action=\"{$this->_action}\" " : '';
        $s .= "font=\"{$this->_font}\" ";
        $s .= $this->_color ? "colorscheme=\"{$this->_color}\" " : '';
        $s .= $this->_ref ? "ref=\"{$this->_ref}\" " : '';

        $s .= '>';
        $s .= '</fb:like>';
        $s .= '</div>';

        return $s;
    }

}