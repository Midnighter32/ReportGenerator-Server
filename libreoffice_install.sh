apt remove --purge libreoffice*
apt autoremove --purge

wget http://downloadarchive.documentfoundation.org/libreoffice/old/6.3.0.4/deb/x86_64/LibreOffice_6.3.0.4_Linux_x86-64_deb.tar.gz

apt install -y libxinerama1 libfontconfig1 libdbus-glib-1-2 libcairo2 libcups2 libglu1-mesa libsm6 libnss3

tar -zxvf LibreOffice_6.3.0.4_Linux_x86-64_deb.tar.gz
cd LibreOffice_6.3.0.4_Linux_x86-64_deb/DEBS

dpkg -i *.deb

cd ../../
rm -rf LibreOffice_6.3.0.4_Linux_x86-64_deb
rm LibreOffice_6.3.0.4_Linux_x86-64_deb.tar.gz