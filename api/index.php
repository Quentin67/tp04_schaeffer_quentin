<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';
 
$app = AppFactory::create();

const JWT_SECRET = "makey1234567";



function addCorsHeaders (Response $response) : Response {

    $response =  $response
    ->withHeader("Access-Control-Allow-Origin", 'http://localhost')
    ->withHeader("Access-Control-Allow-Headers" ,'Content-Type, Authorization')
    ->withHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE,OPTIONS')
    ->withHeader ("Access-Control-Expose-Headers" , "Authorization");

    return $response;
}


// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/hello","/api/hello","/api/login","/api/createUser", "/api/register"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401); 
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->post('/api/login', function (Request $request, Response $response, $args) {
    global $entityManager;

    $json = $request->getBody();
    $dataPosted = json_decode($json, true);
    $login = $dataPosted['login'];
    $password = $dataPosted['password'];

    $userRepository = $entityManager->getRepository('User');
    $user = $userRepository->findOneBy(['login'=>$login]);

    if($user == null){
        return $response->withStatus(401);
    }
    if($user->getPassword() != $password){
        return $response->withStatus(401);
    }

    $issuedAt = time();
    $expirationTime = $issuedAt + 9999999999;

    $payload = array(
        'password' => $password,
        'login' => $login,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
});

$app->get('/api/catalogue', function (Request $request, Response $response, $args) {

    global $entityManager;
    
    $catalogueRepository = $entityManager->getRepository('Catalogue');
    $catalogue = $catalogueRepository->findAll();
    
    $res = [];

    foreach($catalogue as $ref){
        $res[] = [
            "id" => $ref->getId(),
            "ref"=> $ref->getRef(),
            "titre"=>$ref->getTitre(),
            "prix"=>$ref->getPrix()
        ];
    }
    $response = $response
    ->withHeader("Content-Type", "application/json;charset=utf-8");
    
    $response->getBody()->write(json_encode($res));
    return $response;
});

$app->delete('/api/produit/{id}', function (Request $request, Response $response, $args) {
    global $entityManager;

    $id = $args['id'];
    $catalogueRepository = $entityManager->getRepository('Catalogue');
    $produit = $catalogueRepository->find($id);

    $entityManager->remove($produit);
    $entityManager->flush();
    $response->getBody()->write('Produit supprimé');
    return $response;
});

$app->put('/api/produit/{id}', function(Request $request, Response $response, $args){
    //on modifie le produit d'id donné
    //à implémenter quand on aura l'orm
    $id = $args['id'];
    $response->getBody()->write('Produit modifié');
    return $response;

});

$app->get('/api/produit/{id}', function(Request $request, Response $response, $args){
    global $entityManager;

    $id = $args['id'];

    $catalogueRepository = $entityManager->getRepository('Catalogue');
    $produit = $catalogueRepository->find($id);
    $array = [];
    $array['id'] = $produit->getId();
    $array['ref'] = $produit->getRef();
    $array['titre'] = $produit->getTitre();
    $array['prix'] = $produit->getPrix();
    $response->getBody()->write(json_encode($array));
    return $response;
});

$app->get('/api/client/{id}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = "maurice";
    $array ["prenom"] = "emmanuel";
    
    $response->getBody()->write(json_encode ($array));
    return $response;
});

$app->get('/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode ($array));
    return $response;
});


$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode ($array));
    return $response;
});

$app->post('/api/register', function (Request $request, Response $response, $args) {
    global $entityManager;
    $json = $request->getBody();


    $dataPosted = json_decode($json, true);
  
    $password = $dataPosted['password'];
    $login = $dataPosted['login'];

    $user = new User();
    $user->setLogin($login);
    $user->setPassword($password);
    $entityManager->persist($user);
    $entityManager->flush();
  
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;
    $dataFormatted = [
      'password' => $password,
      'login' => $login,
      'iat' => $issuedAt,
      'exp' => $expirationTime
    ];
  
    $token_jwt = JWT::encode($dataFormatted,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
    
    $response->getBody()->write(json_encode($dataFormatted));
  
    return $response;
});

$app->post('/api/produit', function(Request $request, Response $response, $args){
    global $entityManager;

    $json = $request->getBody();
    $dataPosted = json_decode($json, true);

    $catalogue = new Catalogue();
    $catalogue->setRef($dataPosted['ref']);
    $catalogue->setTitre($dataPosted['titre']);
    $catalogue->setPrix($dataPosted['prix']);
    
    $entityManager->persist($catalogue);
    $entityManager->flush();

    $response->getBody()->write("Félicitations jeune padawan");
    return $response;
});

// Chargement du Middleware
$app->addErrorMiddleware(true, true, true);
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();