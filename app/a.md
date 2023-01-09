mac(m1)安装nvm
cd ~
git clone https://github.com/nvm-sh/nvm.git
cd ~/nvm
执行 install.sh
vim ~/.bash_profile
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
source ~/.bash_profile

sticky
https://www.jianshu.com/p/0da2e9cd4352