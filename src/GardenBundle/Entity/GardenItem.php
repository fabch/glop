<?php

namespace GardenBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * GardenItem
 *
 * @ORM\Table(name="garden_item")
 * @ORM\Entity(repositoryClass="GardenBundle\Repository\GardenItemRepository")
 */
class GardenItem
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
     * @var int
     *
     * @ORM\Column(name="type", type="integer", nullable=true)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="picto", type="string", length=255, nullable=true)
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
     * @ORM\Column(name="odr", type="integer", unique=true)
     */
    private $odr;

    /**
     * @var int
     *
     * @ORM\Column(name="price", type="integer")
     */
    private $price;

    /**
     * @var string
     *
     * @ORM\Column(name="infos", type="text", nullable=true)
     */
    private $infos;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="GardenItemPerc", mappedBy="item", cascade={"all"})
     */
    private $percs;

    /**
     * GardenItem constructor.
     */
    public function __construct()
    {
        $this->percs = new ArrayCollection();
    }


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
     * @return GardenItem
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
     * @return GardenItem
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
     * Set type
     *
     * @param integer $type
     *
     * @return GardenItem
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set picto
     *
     * @param string $picto
     *
     * @return GardenItem
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
     * @return GardenItem
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
     * Set odr
     *
     * @param integer $odr
     *
     * @return GardenItem
     */
    public function setOdr($odr)
    {
        $this->odr = $odr;

        return $this;
    }

    /**
     * Get odr
     *
     * @return int
     */
    public function getOdr()
    {
        return $this->odr;
    }

    /**
     * Set price
     *
     * @param integer $price
     *
     * @return GardenItem
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return int
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set infos
     *
     * @param string $infos
     *
     * @return GardenItem
     */
    public function setInfos($infos)
    {
        $this->infos = $infos;

        return $this;
    }

    /**
     * Get infos
     *
     * @return string
     */
    public function getInfos()
    {
        return $this->infos;
    }

    /**
     * Set percs
     *
     * @param ArrayCollection $percs
     *
     * @return GardenItem
     */
    public function setPercs($percs)
    {
        $this->percs = $percs;

        return $this;
    }

    /**
     * Add perc
     *
     * @param GardenItemPerc $perc
     *
     * @return GardenItem
     */
    public function addPerc(GardenItemPerc $perc){

        $this->percs->add($perc);

        return $this;
    }

    /**
     * Remove perc
     *
     * @param GardenItemPerc $perc
     *
     * @return GardenItem
     */
    public function removePerc(GardenItemPerc $perc){

        $this->percs->removeElement($perc);

        return $this;
    }

    /**
     * Get percs
     *
     * @return ArrayCollection
     */
    public function getPercs()
    {
        return $this->percs;
    }
}

