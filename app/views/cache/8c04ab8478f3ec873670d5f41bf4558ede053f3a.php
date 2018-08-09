<h1><?php echo e($title); ?></h1>
<?php echo $__env->make('atoms.button.button', $button, array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
