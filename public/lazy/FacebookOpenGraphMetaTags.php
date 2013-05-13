<?php

class Lazy_FacebookOpenGraphMetaTags
{
    protected $_currentWorkingDirectory;
    protected $_type = null;
    protected $_url;
    protected $_imageFileName;
    protected $_imageFolder;
    protected $_appId;
    protected $_siteName;
    protected $_artists;
    protected $_title;
    protected $_assetsFolder;
    protected $_imageUrl = null;
    protected $_fbAdmins;
    
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

    public function setCurrentWorkingDirectory($cwd)
    {
        $this->_currentWorkingDirectory = (string) $cwd;
        return $this;
    }

    public function setTitle($title)
    {
        $this->_title = (string) $title;
        return $this;
    }

    public function setType($type)
    {
        $this->_type = (string) $type;
        return $this;
    }

    public function setArtists($artists = false)
    {
        $this->_artists = (bool) $artists;
        return $this;
    }

    public function setUrl($url)
    {
        $this->_url = (string) $url;
        return $this;
    }

    public function setSiteName($site)
    {
        $this->_siteName = (string) $site;
        return $this;
    }

    public function setAppId($appId)
    {
        $this->_appId = (int) $appId;
        return $this;
    }

    public function setFolder($imageFolder)
    {
        $this->_imageFolder = (string) $imageFolder;
        return $this;
    }

    public function setFilename($imageFileName)
    {
        $this->_imageFileName = (string) $imageFileName;
        return $this;
    }

    protected function _obtainType()
    {
        switch($this->_currentWorkingDirectory)
        {
            case 'journal':
                $this->_type = 'blog';
                $this->_assetsFolder = 'blog';
                break;
            case 'events':
            case 'past':
                $this->_type = 'article';
                $this->_assetsFolder = 'event';
                break;
            case 'books':
                $this->_type = 'book';
                $this->_assetsFolder = 'shop';
                break;
            case 'clothing':
            case 'music':
            case 'prints':
            case 'shop':
                $this->_type = 'product';
                $this->_assetsFolder = 'shop';
                break;
        }
    }

    public function setImage($image = null)
    {
        $this->_imageUrl = (string) $image;
        return $this;
        
    }

    public function setAdmins($admin)
    {
        $this->_fbAdmins = (int) $admin;
        return $this;
    }

    protected function _constructImageUrl()
    {
        if ($this->_artists == true) {
           $this->_imageUrl = "http://artists.lazygramophone.com/{$this->_currentWorkingDirectory}/images/profile/thumbs/{$this->_imageFileName}";
        }
        else {
           $this->_imageUrl = "http://edit.lazygramophone.com/{$this->_assetsFolder}_assets/images/{$this->_imageFolder}/thumbs/{$this->_imageFileName}";
        }

        return $this;
    }

    public function renderOpenGraphTags()
    {

        if ($this->_type == null) $this->_obtainType();

        if ($this->_imageUrl == null) $this->_constructImageUrl();

        $s = '';
        $s .= "<meta property=\"og:title\"      content=\"{$this->_title}\" />\n";
        $s .= "<meta property=\"og:type\"       content=\"{$this->_type}\" />\n";
        $s .= "<meta property=\"og:url\"        content=\"{$this->_url}\" />\n";
        $s .= "<meta property=\"og:image\"      content=\"{$this->_imageUrl}\" />\n";
        $s .= "<meta property=\"og:site_name\"  content=\"{$this->_siteName}\" />\n";
        $s .= "<meta property=\"og:app_id\"     content=\"{$this->_appId}\" />\n";
        $s .= "<meta property=\"fb:admins\"     content=\"{$this->_fbAdmins}\" />\n";

        return $s;
    }
}