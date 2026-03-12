# ============================================
# Docker Deployment Demo - Dockerfile
# Web Programlama Dersi
# ============================================

# 1. Temel Image
# Alpine Linux tabanlı hafif Nginx image'i kullanıyoruz
FROM nginx:alpine

# 2. Metadata
LABEL maintainer="Web Programlama Dersi"
LABEL description="Docker Deployment Demo - Single Page Website"
LABEL version="1.0"

# 3. Çalışma Dizini
# Nginx'in varsayılan web dizini
WORKDIR /usr/share/nginx/html

# 4. Mevcut dosyaları temizle (opsiyonel ama temizlik açısından iyi)
RUN rm -rf ./*

# 5. Proje Dosyalarını Kopyala
# Tüm statik dosyaları konteyner'e kopyala
COPY index.html .
COPY style.css .
COPY script.js .

# 6. Nginx Konfigürasyonu (isteğe bağlı)
# Özel nginx config kullanmak isterseniz:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 7. Port Aç
# HTTP port
EXPOSE 80

# 8. Sağlık Kontrolü (isteğe bağlı)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# 9. Başlatma Komutu
# Nginx'i ön planda çalıştır (daemon off)
CMD ["nginx", "-g", "daemon off;"]

# ============================================
# BUILD ve RUN Komutları:
# --------------------------------------------
# Image oluştur:
#   docker build -t docker-demo .
#
# Konteyner çalıştır:
#   docker run -d -p 8080:80 --name demo-site docker-demo
#
# Tarayıcıda aç:
#   http://localhost:8080
# ============================================
