<?php
  $json = '["geeks", "for", "geeks"]';
  $data = json_decode($json);
  echo $data[0];
?>