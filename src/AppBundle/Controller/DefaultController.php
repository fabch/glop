<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{

    /**
     * @Route("/index", name="index")
     */
    public function indexAction()
    {
        return $this->render(':default:index.html.twig');
    }

    /**
     * @Route("/", name="app")
     */
    public function appAction()
    {
        return $this->render(':default:app.html.twig');
    }

}
