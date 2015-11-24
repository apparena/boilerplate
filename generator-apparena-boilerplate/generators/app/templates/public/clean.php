<?php
header('P3P: policyref="/w3c/p3p.xml", CP="ALL DSP NID CURa ADMa DEVa HISa OTPa OUR NOR NAV DEM"');
define("ROOT_PATH", realpath(dirname(__FILE__))); //TODO: use real project path because you dont know where "public" is
require ROOT_PATH . '/vendor/autoload.php';

if (!empty($_GET['debug']))
{
    $debug_mode = true;
}
else
{
    $debug_mode = false;
}

$m_id = <%= modelId %>; // Set your app-arena Model ID here
$am   = new \AppManager\AppManager(
    $m_id,
    array(
        "cache_dir" => ROOT_PATH . "/<%= cachePath %>"
    )
);
$am->cleanCache();
?>
<!doctype html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7 <?=$device; ?>-html"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8 <?=$device; ?>-html"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9 <?=$device; ?>-html"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js <?= $am->getDeviceType(); ?>-html"> <!--<![endif]-->

<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <META NAME="ROBOTS" CONTENT="NOINDEX,NOFOLLOW">
</head>

<body>

<div class="container">
    <div class="row">
        <div class="col-md-12 text-center">
            <br><br><br><br><br>
            <?php
            $image = time() % 4;
            switch ($image) {
                case 0:
                    echo '<img src="https://i.warosu.org/data/fa/img/0069/25/1379550014746.jpg" alt="">';
                    break;
                case 1:
                    echo '<img src="http://www.italymagazine.com/sites/default/files/styles/624xauto/public/27f.jpg" alt="">';
                    break;
                case 2:
                    echo '<img src="https://i.warosu.org/data/fa/img/0075/57/1389053230209.jpg" alt="">';
                    break;
                case 3:
                    echo '<img src="http://www.facebookbeststatus.com/wp-content/uploads/2010/10/chuck-norris-google.jpg" alt="">';
                    break;
            }
            ?>

            <h1>Server cache successfully cleaned.</h1>

            <!--<br><br><br><br><br>
            <p class="help-block">
                Image copyright
            </p>-->

        </div>
    </div>
</div>

</body>
</html>
