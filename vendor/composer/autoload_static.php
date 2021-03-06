<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit4bede8c8b386e551835a3cc5e16a4ce9
{
    public static $prefixLengthsPsr4 = array (
        's' => 
        array (
            'stirlands\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'stirlands\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src/api',
        ),
    );

    public static $classMap = array (
        'stirlands\\DbConnect' => __DIR__ . '/../..' . '/src/api/dbConnect.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit4bede8c8b386e551835a3cc5e16a4ce9::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit4bede8c8b386e551835a3cc5e16a4ce9::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit4bede8c8b386e551835a3cc5e16a4ce9::$classMap;

        }, null, ClassLoader::class);
    }
}
