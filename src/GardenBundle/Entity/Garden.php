<?php

namespace GardenBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Garden
 *
 * @ORM\Table(name="garden", uniqueConstraints={@ORM\UniqueConstraint(name="user_garden_idx", columns={"id", "user"})}))
 * @ORM\Entity(repositoryClass="GardenBundle\Repository\GardenRepository")
 */
class Garden
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
     * @var int
     *
     * @ORM\Column(name="user", type="integer", nullable=true)
     */
    private $user;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="text")
     */
    private $text;

    /**
     * @var int
     *
     * @ORM\Column(name="points", type="integer")
     */
    private $points;

    /**
     * @var array
     *
     * @ORM\OneToMany(targetEntity="GardenIndicator", mappedBy="garden", cascade={"all"})
     */
    private $indicators;

    /**
     * @var int
     *
     * @ORM\OneToMany(targetEntity="GardenTile", mappedBy="garden", cascade={"all"})
     */
    private $tiles;

    /**
     * var array
     *
     * @ORM\ManyToMany(targetEntity="GardenItem")
     * @ORM\JoinTable(name="garden_available_items",
     *      joinColumns={@ORM\JoinColumn(name="garden_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="item_id", referencedColumnName="id")}
     * )
     */
    private $availableItems;

    /**
     * Garden constructor.
     */
    public function __construct()
    {
        $this->indicators = new ArrayCollection();
        $this->tiles = new ArrayCollection();
        $this->availableItems = new ArrayCollection();
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
     * Set user
     *
     * @param integer $user
     *
     * @return Garden
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return int
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set text
     *
     * @param string $text
     *
     * @return Garden
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get text
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set points
     *
     * @param integer $points
     *
     * @return Garden
     */
    public function setPoints($points)
    {
        $this->points = $points;

        return $this;
    }

    /**
     * Get points
     *
     * @return int
     */
    public function getPoints()
    {
        return $this->points;
    }

    /**
     * Set indicators
     *
     * @param integer $indicators
     *
     * @return Garden
     */
    public function setIndicators($indicators)
    {
        $this->indicators = $indicators;

        return $this;
    }

    /**
     * Get indicators
     *
     * @return int
     */
    public function getIndicators()
    {
        return $this->indicators;
    }

    /**
     * Set tiles
     *
     * @param integer $tiles
     *
     * @return Garden
     */
    public function setTiles($tiles)
    {
        $this->tiles = $tiles;

        return $this;
    }

    /**
     * Get tiles
     *
     * @return int
     */
    public function getTiles()
    {
        return $this->tiles;
    }


    /**
     * get availableItems
     *
     * @return array
     */
    public function getAvailableItems()
    {
        return $this->availableItems;
    }

    /**
     * set availableItems
     *
     * @param array $availableItems
     */
    public function setAvailableItems($availableItems)
    {
        $this->availableItems = $availableItems;
        return $this;
    }
}

