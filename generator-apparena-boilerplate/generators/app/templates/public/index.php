<?php
/**
 * Created by PhpStorm.
 * User: Darius
 * Date: 19.11.2015
 * Time: 09:39
 */
define("ROOT_PATH", realpath(dirname(__FILE__)));
require ROOT_PATH . '/vendor/autoload.php';

$m_id = <%= modelId %>; // Set your app-arena Model ID here

// Clear the cache before, requestion Instance in for each
$am = new \AppManager\AppManager(
    $m_id,
    array(
        "cache_dir" => ROOT_PATH . "/<%= cachePath %>"
    )
);
// Get all necessary instance information to start working
$config = $am->getConfigs();
$translation = $am->getTranslations();
$info = $am->getInfos();
?>
<html>
  <head>
    <title><%= appName %></title>
  </head>
</html>