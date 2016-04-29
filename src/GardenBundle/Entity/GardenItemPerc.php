<?php

namespace GardenBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GardenItemPerc
 *
 * @ORM\Table(name="garden_item_perc")
 * @ORM\Entity(repositoryClass="GardenBundle\Repository\GardenItemPercRepository")
 */
class GardenItemPerc
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
     * @var GardenItem
     *
     * @ORM\ManyToOne(targetEntity="GardenItem", inversedBy="percs")
     * @ORM\JoinColumn(name="item_id", referencedColumnName="id")
     */
    private $item;

    /**
     * @var GardenIndicator
     *
     * @ORM\ManyToOne(targetEntity="GardenIndicator", inversedBy="percs")
     * @ORM\JoinColumn(name="indicator_id", referencedColumnName="id")
     */
    private $indicator;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="text", nullable=true)
     */
    private $text;

    /**
     * @var float
     *
     * @ORM\Column(name="value", type="float")
     */
    private $value;

    /**
     * GardenItemPerc constructor.
     *
     * @param GardenItem $item
     * @param GardenIndicator $indicator
     */
    public function __construct(GardenItem $item, GardenIndicator $indicator)
    {
        $this->item = $item;
        $this->indicator = $indicator;
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
     * Set item
     *
     * @param GardenItem $item
     *
     * @return GardenItemPerc
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
     * Set indicator
     *
     * @param GardenIndicator $indicator
     *
     * @return GardenItemPerc
     */
    public function setIndicator(GardenIndicator $indicator)
    {
        $this->indicator = $indicator;

        return $this;
    }

    /**
     * Get indicator
     *
     * @return GardenIndicator
     */
    public function getIndicator()
    {
        return $this->indicator;
    }

    /**
     * Set text
     *
     * @param string $text
     *
     * @return GardenItemPerc
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
     * Set value
     *
     * @param float $value
     *
     * @return GardenItemPerc
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
}

