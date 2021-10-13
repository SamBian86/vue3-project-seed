#!/bin/bash
# 此批处理用于将dist中的内容打包成rar
# 文件名构建
today=$(date "+%Y%m%d")
now=$(date "+%Y%m%d%H%M")
projectName="新版乐享耘林"
version=v1.0.0
env="PROD@生产环境"
filename=${today}_${projectName}_${version}_${env}_${now}

# 压缩工具路径
# 请将winrar添加到环境变量就可以使用此脚本
executeTools=winrar
targetDirectory="../dist"
saveDirectory=./

echo -e "\033[36m 打包压缩文件$filename \033[0m"
echo -e "\033[36m ${saveDirectory}${filename}.rar \033[0m"
mv ${targetDirectory} ${filename}
${executeTools} a ${saveDirectory}${filename}.rar ./${filename}
mv ${filename} ${targetDirectory}
echo -e "\033[36m 打包完成 \033[0m"
