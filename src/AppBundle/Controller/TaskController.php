<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Task;
use FOS\RestBundle\Controller\FOSRestController;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends FOSRestController
{
    /**
     * @ParamConverter()
     * @ApiDoc()
     *
     * @param Task $task
     *
     * @return Task
     */
    public function getTaskAction(Task $task)
    {
        return $task;
    }

    /**
     * @ApiDoc()
     *
     * @return Task[]
     */
    public function getTasksAction()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Task')->findAll();
    }

    /**
     * @ApiDoc()
     *
     * @param Request $request
     *
     * @return Task
     */
    public function postTasksAction(Request $request)
    {
        $task = new Task();
        $task->setText($request->request->get('text'));

        $errors = $this->get('validator')->validate($task);
        if (count($errors) > 0) {
            $errorStrings = [];
            foreach ($errors as $error) {
                $errorStrings[] = $error->getMessage();
            }
            return $this->view(
                [
                    'error' => implode(',', $errorStrings)
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $this->getDoctrine()->getManager()->persist($task);
        $this->getDoctrine()->getManager()->flush();

        return $task;
    }

    /**
     * @ApiDoc()
     *
     * @param Task $task
     *
     * @return Response
     */
    public function deleteTaskAction(Task $task)
    {
        $this->getDoctrine()->getManager()->remove($task);
        $this->getDoctrine()->getManager()->flush();

        return new Response('', Response::HTTP_NO_CONTENT);
    }
}