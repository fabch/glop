<?php

namespace GardenBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GardenTile
 *
 * @ORM\Table(name="garden_tile")
 * @ORM\Entity(repositoryClass="GardenBundle\Repository\GardenTileRepository")
 */
class GardenTile
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
     * @ORM\Column(name="x", type="integer")
     */
    private $x;

    /**
     * @var int
     *
     * @ORM\Column(name="y", type="integer")
     */
    private $y;

    /**
     * @var int
     *
     * @ORM\ManyToOne(targetEntity="GardenItem")
     * @ORM\JoinColumn(name="item_id", referencedColumnName="id")
     */
    private $item;

    /**
     * @var int
     *
     * @ORM\ManyToOne(targetEntity="Garden", inversedBy="tiles")
     * @ORM\JoinColumn(name="garden_id", referencedColumnName="id")
     */
    private $garden;


    /**
     * Garden constructor.
     * @param Garden $garden
     */
    public function __construct($garden)
    {
        $this->item = null;
        $this->garden = $garden;
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
     * Set x
     *
     * @param integer $x
     *
     * @return GardenTile
     */
    public function setX($x)
    {
        $this->x = $x;

        return $this;
    }

    /**
     * Get x
     *
     * @return int
     */
    public function getX()
    {
        return $this->x;
    }

    /**
     * Set y
     *
     * @param integer $y
     *
     * @return GardenTile
     */
    public function setY($y)
    {
        $this->y = $y;

        return $this;
    }

    /**
     * Get y
     *
     * @return int
     */
    public function getY()
    {
        return $this->y;
    }

    /**
     * Set item
     *
     * @param GardenItem $item
     *
     * @return GardenTile
     */
    public function setItem(GardenItem $item)
    {
        $this->item = $item;

        return $this;
    }

    /**
     * Get item
     *
     * @return GardenItem
     */
    public function getItem()
    {
        return $this->item;
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
}

