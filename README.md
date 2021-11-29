# biblioteca
Projeto de gerenciamento de uma biblioteca.

## descrição técnica
Projeto feito com [laravel][laravel-site] e [reactjs][reactjs-site], duas ferramentas extremamente populates, ativamente atualizadas, utilizadas por grandes e pequenos projetos ao redor do mundo, com uma vastidão de ferramentas de desenvolvimento, debug e auxílios na internet, além de serem ferramentas excelentes.

O projeto foi concebido para ser uma _api_ que é consumida por um _front-end_. Acredito que essa é a melhor forma de construir aplicações porque cria uma camada de separação de responsabilidades entro o _front-end_ e _back-end_, também aumenta a capacidade de uso da aplicação já que uma _api_ pode ser consumida por qualquer _front-end_, aplicativo ou mesmo um aplicativo de _desktop_ que consiga fazer requisições _http_.

Essa abordagem também busca garantir a descartabilidade dos componentes, de forma que, se uma organização decidir que o _front-end_ precisa ser refeito, seja com as mesmas tecnologias ou outras, a _front-end_ pode ser tranquilamente descartável e implantado seja no mesmo repositório ou em outro. O mesmo funciona de forma contrária, o _front-end_ pode ser facilmente abstraído da aplicação e consumir outro _back-end_ compatível.

### observação
Para fins de praticidade o arquivo `.env` está incluso nos arquivos do projeto, em uma aplicação comercial esse aquivo *NÃO* deve estár disponibilizado no versionamento, por conter informações sensíveis, neste projeto contudo foram tomadas precauções para que nenhum tipo de dado sensível estivesse contudo no aquivo.

## setup
Para melhor utilizar esse projeto é necessário ter o [docker][docker-site] e [docker-compose][docker-compose-site] instalados, artigos para a instalação de ambos podem ser encontrados [aqui][instalacao-docker] e [aqui][instalacao-docker-compose]. Os assets já deverão estar compilados, contudo se você quiser compilar-los precisa ter instalado o _node_ com versão 16.13 ou superior com _npm_ habilitado.
Caso não queira utilizar o docker é necessário ter o [php][php-site] instalado em sua maquina com as [extensões necessárias][laravel-requirements-site] para rodar o laravel e suporte para `sqlite` para os testes unitários.

### com docker
Como o `docker-compose` instalado na sua maquina, na raiz do projeto rode o comando:

`docker-compose up -d`

Esse comando irá baixar os containers necessários e irá levanta-los. Após terminar de subir o ambiente para instalar as dependências do projeto execute o comando:

`docker exec dt-php composer install`

É necessário criar uma chave para a aplicação laravel para que tudo funcione normalmente. Para cria-la utilize o comando:

`docker exec dt-php artisan generate:key`

Esse comando irá instalar os pacotes do composer. Para criar as tabelas do banco de dados execute o comando:

`docker exec dt-php php artisan migrate`

Para adicionar os usuários, permissões e dados pertinentes execute o comando:

`docker exec dt-php php artisan db:seed`

Após fazer isso para compilar os assets execute o comando:

`npm run prod`

Feito isso a aplicação já está pronta para roda na porta 1700 do seu localhost. Em seu navegador abra a seguinte url:

`localhost:1700`

Feito isso, a aplicação já pode ser utilizada normalmente.

É comum que o `docker`mude as permissões dos arquivos na hora da instação, se verificar um erro de permissão execute o comando:

`sudo chmod 777 -R .`

### instalação sem o docker.
É necessário conter todos as dependências necessárias para fazer o laravel funcionar localmente, além de ter o [composer][composer-site] instalado localmente em sua maquina para instalar as dependências do projeto. Certificando-se que as dependências estão corretamente instaladas, você pode instalar o [nginx][nginx-site] e configurar o laravel nele segundo [esse tutorial][tutorial-site], ou [apache][apache-site] seguindo [esse tutorial][apache-tutorial-site], observando que ao invés de criar um novo projeto laravel você irá mover esse projeto para a pasta do nginx ou apache.

Também pode utilizar o servidor de testes do laravel.

Independentemente do modo escolhido você deve ir na pasta raiz do projeto e executar os seguintes comandos:

`composer install`

Esse comando irá instalar os pacotes do composer. Para criar as tabelas do banco de dados execute o comando:

`php artisan migrate`

Para adicionar os usuários, permissões e dados pertinentes execute o comando:

`php artisan db:seed`

Para que a aplicação funcione corretamente você deve alterar a `url` no parâmetro `apiUrl` do arquivo `env.ts` para que as requisições do _front-end_ funcionem corretamente, bem como alterar a chave `APP_URL` e `SANCTUM_STATEFUL_DOMAINS` para o endereço correto, por exemplo, se a porta onde você irá acessar o sistema é a 8080 deverá alterar os lugares onde está posta a string `localhost:1700` para a string `localhost:8080`

Após fazer isso para compilar os assets execute o comando:

`npm run prod`

Feito isso a aplicação já está pronta para rodar. Caso queira usar o servidor local do laravel execute o comando:

`php artisan serve`

Caso esteja utilizando _nginx_ ou _apache_ esse passo é desnecessário.

Feito isso, a aplicação já pode ser utilizada normalmente na porta indicada no terminal.

### informações complementares
A aplicação tem dois usuários padrões, que são _bibliotecario_ e _administrador_, o que diferencia ambos é que o administrador pode realizar todas as tarefas no sistema, o bibliotecário tem várias permissões mas não todas, outros usuários podem ser adicionados pelo _front-end_ da aplicação.

##### informações de login
```
    # bibliotecario
    usuario: bibliotecario
    senha: bibliotecario123

    # administrador.
    usuario: admin
    senha: admin2021
```

## testes
Os testes da aplicação podem ser feitos de duas formas, usando o `docker` ou não.

### com docker
`docker exec dt-php php artisan test`

### sem o docker
É necessário tem extensões do `sqlite3` do _php_ para executar os testes localmente.
`php artisan test`

[laravel-site]: https://laravel.com/
[reactjs-site]: https://pt-br.reactjs.org/
[docker-site]: https://www.docker.com/
[docker-compose-site]: https://docs.docker.com/compose/
[instalacao-docker]: https://www.hostinger.com.br/tutoriais/install-docker-ubuntu
[instalacao-docker-compose]: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt
[php-site]: https://www.php.net/
[laravel-requirements-site]: https://laravel.com/docs/8.x/deployment#server-requirements
[nginx-site]: https://www.nginx.com/
[apache-tutorial-site]: https://www.hostinger.com.br/tutoriais/como-instalar-laravel-ubuntu
[tutorial-site]: https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-laravel-with-nginx-on-ubuntu-20-04-pt

