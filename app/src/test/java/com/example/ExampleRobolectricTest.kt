package com.example

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [36])
class ExampleRobolectricTest {

  @Test
  fun `read string from context`() {
    val context = ApplicationProvider.getApplicationContext<Context>()
    val appName = context.getString(R.string.app_name)
    assertEquals("Color Fun", appName)
  }

  @Test
  fun `verify village and anime artwork assets exist`() {
    val context = ApplicationProvider.getApplicationContext<Context>()
    val assets = context.assets.list("web/images") ?: emptyArray()
    val villageImages = assets.filter { it.startsWith("village_") }
    val animeImages = assets.filter { it.startsWith("anime_") }
    assertEquals(22, villageImages.size)
    assertEquals(12, animeImages.size)
  }
}
