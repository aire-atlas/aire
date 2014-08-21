# Notes about the GIT repository itself

These notes can be useful for later merges and co.

## Legacy history

The original repository contained
* heavy data in app/data/ (more than 100 MB)
* submodules (more than 10 external references)


## 20140821: filter-branch 'rm --cached app:data'

The heavy data has been moved to:
* [sysconf.app.aire:tree/usr/share/aire/data](https://github.com/aire-atlas/sysconf.app.aire/tree/master/tree/usr/share/aire/data)
* [atlas-riate-europe](https://github.com/aire-atlas/atlas-riate-europe/tree/master/aire-data)

To save some 130 MB of repository weight, we did:
```
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch app/data' HEAD
```

And removed all former refs, having cloned the original repository to
[jfgigand's](https://github.com/jfgigand/aire).


## 20140821: convert all remaining submodules to subtrees

To make them stable (and not depend on vendor's), the submodule
repositories had been forked on GitHub under
[aire-atlas](https://github.com/aire-atlas).

This is heavy and unnecessary. So we include them as subtree, not
merging the full history of the ext project (using --squash).

The ``` .gitmodules ``` file contained:
```
[submodule "vendor/doctrine-common"]
	path = vendor/doctrine-common
	url = https://github.com/doctrine/common.git
[submodule "vendor/doctrine-mongodb"]
	path = vendor/doctrine-mongodb
	url = https://github.com/doctrine/mongodb.git
[submodule "vendor/doctrine-mongodb-odm"]
	path = vendor/doctrine-mongodb-odm
	url = https://github.com/aire-atlas/mongodb-odm.git
[submodule "vendor/bundles/Symfony/Bundle/DoctrineMongoDBBundle"]
	path = vendor/bundles/Symfony/Bundle/DoctrineMongoDBBundle
	url = https://github.com/doctrine/DoctrineMongoDBBundle.git
[submodule "vendor/symfony"]
	path = vendor/symfony
	url = https://github.com/aire-atlas/symfony.git
[submodule "vendor/twig"]
	path = vendor/twig
	url = https://github.com/fabpot/Twig.git
[submodule "vendor/monolog"]
	path = vendor/monolog
	url = https://github.com/Seldaek/monolog.git
[submodule "vendor/bundles/Sensio/Bundle/FrameworkExtraBundle"]
	path = vendor/bundles/Sensio/Bundle/FrameworkExtraBundle
	url = https://github.com/sensio/SensioFrameworkExtraBundle.git
[submodule "vendor/bundles/Funkiton/InjectorBundle"]
	path = vendor/bundles/Funkiton/InjectorBundle
	url = https://github.com/aire-atlas/InjectorBundle.git
[submodule "vendor/gedmo-doctrine-extensions"]
	path = vendor/gedmo-doctrine-extensions
	url = https://github.com/aire-atlas/gedmo-doctrine-extensions.git
[submodule "vendor/bundles/Stof/DoctrineExtensionsBundle"]
	path = vendor/bundles/Stof/DoctrineExtensionsBundle
	url = https://github.com/aire-atlas/StofDoctrineExtensionsBundle.git
[submodule "vendor/bundles/FOS/UserBundle"]
	path = vendor/bundles/FOS/UserBundle
	url = https://github.com/FriendsOfSymfony/FOSUserBundle.git
```

And ``` git submodule ``` printed:
```
-d9bb15228e0655ed96d56352584cfcf0fc73b1bb vendor/bundles/FOS/UserBundle
-f4e7edc70b2d28dd3da5ee43d34cef15861dc7f6 vendor/bundles/Funkiton/InjectorBundle
-d36c60b4b1f47081476742d4aae39d4a5c9f4272 vendor/bundles/Sensio/Bundle/FrameworkExtraBundle
-45233976e7ea0374e7a408dfea9f6eb315ba5bf8 vendor/bundles/Stof/DoctrineExtensionsBundle
-5418b05bfb28e15db18d2711266e4cd9c57ded57 vendor/bundles/Symfony/Bundle/DoctrineMongoDBBundle
-c614a20e02cb8fd5531bce1adcb34a1210f79ac6 vendor/doctrine-common
-5645300539e976bab19fbb64fcdcb76fcfde4f13 vendor/doctrine-mongodb
-98dc46f1e1ff6f55e659d5f06d70788b72c33a46 vendor/doctrine-mongodb-odm
-9312498e1f2d15920a20392dd646c4df6e368345 vendor/gedmo-doctrine-extensions
-fe0b8b59ed65565931dc8db78ac628ef1cb65f7d vendor/monolog
-603b5ac669941a9fa95e8c16529581e04265682d vendor/symfony
-661e9c7ad2820e881c93474f2fbcbe2661fd1970 vendor/twig
```

What we did is fetching all refs:
```
for url in https://github.com/doctrine/common.git https://github.com/doctrine/mongodb.git https://github.com/aire-atlas/mongodb-odm.git https://github.com/doctrine/DoctrineMongoDBBundle.git https://github.com/aire-atlas/symfony.git https://github.com/fabpot/Twig.git https://github.com/Seldaek/monolog.git https://github.com/sensio/SensioFrameworkExtraBundle.git https://github.com/aire-atlas/InjectorBundle.git https://github.com/aire-atlas/gedmo-doctrine-extensions.git https://github.com/aire-atlas/StofDoctrineExtensionsBundle.git https://github.com/FriendsOfSymfony/FOSUserBundle.git; do git fetch $url aire; done
```

And add them as subtrees:
```
git subtree add --squash -P vendor/bundles/Funkiton/InjectorBundle f4e7edc70b2d28dd3da5ee43d34cef15861dc7f6
git subtree add --squash -P vendor/bundles/Sensio/Bundle/FrameworkExtraBundle d36c60b4b1f47081476742d4aae39d4a5c9f4272
git subtree add --squash -P vendor/bundles/Stof/DoctrineExtensionsBundle 45233976e7ea0374e7a408dfea9f6eb315ba5bf8
git subtree add --squash -P vendor/bundles/Symfony/Bundle/DoctrineMongoDBBundle 
git subtree add --squash -P vendor/doctrine-common c614a20e02cb8fd5531bce1adcb34a1210f79ac6
git subtree add --squash -P vendor/doctrine-mongodb 5645300539e976bab19fbb64fcdcb76fcfde4f13
git subtree add --squash -P vendor/doctrine-mongodb-odm 98dc46f1e1ff6f55e659d5f06d70788b72c33a46
git subtree add --squash -P vendor/gedmo-doctrine-extensions 9312498e1f2d15920a20392dd646c4df6e368345
git subtree add --squash -P vendor/monolog fe0b8b59ed65565931dc8db78ac628ef1cb65f7d
git subtree add --squash -P vendor/symfony 603b5ac669941a9fa95e8c16529581e04265682d
git subtree add --squash -P vendor/twig 661e9c7ad2820e881c93474f2fbcbe2661fd1970
```
