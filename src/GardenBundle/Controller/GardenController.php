<?php

namespace GardenBundle\Controller;

use GardenBundle\Entity\Garden;
use FOS\RestBundle\Controller\FOSRestController;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GardenController extends FOSRestController
{
    /**
     * @ParamConverter()
     * @ApiDoc()
     *
     * @param Garden $garden
     *
     * @return Garden
     */
    public function getGardenAction(Garden $garden)
    {
        return $garden;
    }
}