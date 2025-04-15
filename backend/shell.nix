{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    (pkgs.python3.withPackages (ps: with ps; [
      flask
      mysqlclient
      pyjwt
      passlib
      python-dotenv
      requests
      flask-cors    # Nota el guión bajo
      python-socketio  # Este sí mantiene el nombre original
    ]))
  ];
}