import React, { useContext, useState } from "react";
import LoginAppBar from "./LoginAppBar";
import { Card, Typography, Box } from "@mui/material";
import { GlobalContext } from "./ApplicationContext";
const About = () => {


    return (
        <LoginAppBar>
            <Card
                sx={{ maxWidth: 1200 }}>

                <div>

                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            About (Hakkında)
                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: "left", mb: 1 }}>
                            Misyonumuz
                        </Typography>
                        <Typography paragraph>
                            Finansal gelir ve giderlerinizi kolayca takip edebilmenizi sağlamak, mali durumunuzu daha iyi yönetmenize yardımcı olmak ve finansal hedeflerinize ulaşmanızı desteklemek için buradayız.
                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: "left", mb: 1 }}>
                            Hedefimiz
                        </Typography>
                        <Typography paragraph>
                            Finansal yönetimi herkes için erişilebilir ve anlaşılır hale getirmek. Kullanıcı dostu arayüzümüz ve güçlü analiz araçlarımızla kişisel ve işletme finansmanınızı daha etkili bir şekilde yönetmenizi sağlamak.
                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: "left", mb: 1 }}>
                            Özelliklerimiz
                        </Typography>
                        <Typography paragraph>
                            • Kolay Gelir ve Gider girişi: Gelir ve Giderlerinizi hızlıca kaydedin ve takip edin.<br />
                            • Kategorilendirme: Harcamalarınızı ve gelirlerinizi kategorilere ayırarak daha iyi bir analiz yapın.<br />
                            • Grafik ve Raporlar: Gelir ve Giderlerinizin grafiksel ve rapor şeklinde özetlerini görün.<br />
                            • Bütçe Takibi: Bütçelerinizi belirleyin ve harcamalarınızı kontrol altında tutun.<br />
                            • Güvenlik: Verilerinizin güvenliği bizim için önemlidir. Tüm verileriniz şifrelenerek korunur.
                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: "left", mb: 1 }}>
                            Ekibimiz
                        </Typography>
                        <Typography paragraph>
                            Muaz Çoban ve finansal teknolojiler konusunda uzman yazılım ekibimiz, sizlere en iyi deneyimi sunmak için çalışmaktadır. Sürekli olarak kullanıcı geri bildirimlerini değerlendirip, uygulamamızı daha da geliştirmeye devam ediyoruz.
                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: "left", mb: 1 }}>
                            İletişim
                        </Typography>
                        <Typography paragraph>
                            Herhangi bir sorunuz veya geri bildirimleriniz için bize ulaşabilirsiniz:<br />
                            • Email: email@example.com<br />
                            • Telefon: +90 123 456 7890<br />
                            • Sosyal Medya: Twitter, LinkedIn<br />
                            • https://fimple.co.uk/
                        </Typography>
                    </Box>
                </div>

            </Card>
        </LoginAppBar>
    );

}
export default About;