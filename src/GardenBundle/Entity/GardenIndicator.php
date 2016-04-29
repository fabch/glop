<?php

namespace GardenBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use GardenBundle\Entity\Garden;

/**
 * GardenIndicator
 *
 * @ORM\Table(name="garden_indicator")
 * @ORM\Entity(repositoryClass="GardenBundle\Repository\GardenIndicatorRepository")
 */
class GardenIndicator
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="uid", type="guid")
     */
    private $uid;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="picto", type="string", length=255)
     */
    private $picto;

    /**
     * @var string
     *
     * @ORM\Column(name="cl", type="string", length=255, nullable=true)
     */
    private $cl;

    /**
     * @var int
     *
     * @ORM\Column(name="criteria", type="integer")
     */
    private $criteria;

    /**
     * @var float
     *
     * @ORM\Column(name="value", type="float", nullable=true)
     */
    private $value;

    /**
     * @var float
     *
     * @ORM\Column(name="min", type="float")
     */
    private $min;

    /**
     * @var float
     *
     * @ORM\Column(name="max", type="float")
     */
    private $max;

    /**
     * @var Garden
     *
     * @ORM\ManyToOne(targetEntity="Garden", inversedBy="indicators")
     * @ORM\JoinColumn(name="garden_id", referencedColumnName="id")
     */
    private $garden;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="GardenItemPerc", mappedBy="indicator", cascade={"all"})
     */
    private $percs;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set uid
     *
     * @param string $uid
     *
     * @return GardenIndicator
     */
    public function setUid($uid)
    {
        $this->uid = $uid;

        return $this;
    }

    /**
     * Get uid
     *
     * @return string
     */
    public function getUid()
    {
        return $this->uid;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return GardenIndicator
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set picto
     *
     * @param string $picto
     *
     * @return GardenIndicator
     */
    public function setPicto($picto)
    {
        $this->picto = $picto;

        return $this;
    }

    /**
     * Get picto
     *
     * @return string
     */
    public function getPicto()
    {
        return $this->picto;
    }

    /**
     * Set cl
     *
     * @param string $cl
     *
     * @return GardenIndicator
     */
    public function setCl($cl)
    {
        $this->cl = $cl;

        return $this;
    }

    /**
     * Get cl
     *
     * @return string
     */
    public function getCl()
    {
        return $this->cl;
    }

    /**
     * Set criteria
     *
     * @param integer $criteria
     *
     * @return GardenIndicator
     */
    public function setCriteria($criteria)
    {
        $this->criteria = $criteria;

        return $this;
    }

    /**
     * Get criteria
     *
     * @return int
     */
    public function getCriteria()
    {
        return $this->criteria;
    }

    /**
     * Set value
     *
     * @param float $value
     *
     * @return GardenIndicator
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return float
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set min
     *
     * @param float $min
     *
     * @return GardenIndicator
     */
    public function setMin($min)
    {
        $this->min = $min;

        return $this;
    }

    /**
     * Get min
     *
     * @return float
     */
    public function getMin()
    {
        return $this->min;
    }

    /**
     * Set max
     *
     * @param float $max
     *
     * @return GardenIndicator
     */
    public function setMax($max)
    {
        $this->max = $max;

        return $this;
    }

    /**
     * Get max
     *
     * @return float
     */
    public function getMax()
    {
        return $this->max;
    }

    /**
     * get garden
     *
     * @return Garden
     */
    public function getGarden()
    {
        return $this->garden;
    }

    /**
     * set garden
     *
     * @param Garden $garden
     */
    public function setGarden(Garden $garden)
    {
        $this->garden = $garden;
        return $this;
    }

    /**
     * get percs
     *
     * @return ArrayCollection
     */
    public function getPercs()
    {
        return $this->percs;
    }

    /**
     * set percs
     *
     * @param ArrayCollection $percs
     */
    public function setPercs($percs)
    {
        $this->percs = $percs;
        return $this;
    }
}

